<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :width="formWidth"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px" label-position="left">
      <el-form-item label="ID" prop="id">
        <el-input v-model="editForm.id" :disabled="true" />
      </el-form-item>
      <el-form-item :label="$t('__name')" prop="name">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item :label="$t('__dealerPhoto')">
        <el-upload
          action=""
          :http-request="uploadHttpRequest"
          list-type="picture-card"
          accept="image/jpeg,image/gif,image/png"
          :file-list="fileList"
          :on-change="handleChange"
          drag
        >
          <i class="el-icon-plus" />
          <div slot="tip" class="el-upload__tip">{{ uploadTip }}</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span v-if="!dialogLoading" slot="footer">
      <el-button class="bg-gray" @click="onReset">{{ $t("__reset") }}</el-button>
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import handleDialogWidth from '@/layout/mixin/handleDialogWidth'

export default {
  name: 'EditDialog',
  mixins: [handleDialogWidth],
  props: {
    title: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    visible: {
      type: Boolean,
      require: true
    },
    confirm: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    form: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    imageList: {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data: function() {
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {},
      dialogLoading: false,
      fromData: new FormData(),
      fileList: this.imageList,
      limitImageWidth: 420,
      limitImageHeight: 480
    }
  },
  computed: {
    uploadTip() {
      return `jpg/png，寬度=${this.limitImageWidth}px 高度=${this.limitImageHeight}px`
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.onReset()
      }
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    uploadHttpRequest(params) {
      const { file } = params
      this.fromData.set('imageFile', file)
    },
    checkImageSize(file, limitSize) {
      return new Promise(function(resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function() {
          const valid = img.width == limitSize.width && img.height == limitSize.height
          resolve(valid)
        }
        img.src = _URL.createObjectURL(file)
      }).then((valid) => {
        return valid
      })
    },
    onSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const imageFile = this.fromData.get('imageFile')
          if (imageFile) {
            const isIMAGE = (imageFile.type === 'image/jpeg') || (imageFile.type === 'image/gif') || (imageFile.type === 'image/png')
            if (!isIMAGE) {
              this.fileList = []
              this.$message.error(this.$t('__fileError'))
              return
            }
            const limitSize = { width: this.limitImageWidth, height: this.limitImageHeight }
            this.checkImageSize(imageFile, limitSize).then((validSize) => {
              if (validSize) {
                this.send()
              } else {
                this.fileList = []
                this.$message.error(this.$stringFormat(this.$t('__imageSizeLimit'), [limitSize.width, limitSize.height]))
              }
            })
          } else {
            this.send()
          }
        }
      })
    },
    send() {
      for (const data in this.editForm) {
        this.fromData.set(data, this.editForm[data])
      }
      this.$emit('confirm', this.fromData)
    },
    onClose() {
      this.$emit('close')
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.fromData = new FormData()
      this.fileList = JSON.parse(JSON.stringify(this.imageList))
      this.$nextTick(() => {
        this.$refs.editForm.clearValidate()
      })
    },
    setDialogLoading(dialogLoading) {
      this.dialogLoading = dialogLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-bottom: 10px;
}

.el-input {
  width: 90%;
}
</style>
