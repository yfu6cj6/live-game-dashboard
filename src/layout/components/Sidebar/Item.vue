<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showSuffix: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const { icon, title, showSuffix } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<div class='fas yellow'><i class={[icon, 'sub-el-icon']} style='height: 1.33333rem; width: 1.33333rem; color: #f9c901;' /></div>)
      } else {
        vnodes.push(<div class='fas yellow'><svg-icon icon-class={icon} style='height: 1.33333rem; width: 1.33333rem;'/></div>)
      }
    }

    if (title && icon) {
      if (showSuffix) {
        vnodes.push(<span class='title-container'><span slot='title' class='text'><p>{(title)}</p></span><span><i class='el-submenu__icon-arrow el-icon-arrow-right mr-1'></i></span></span>)
      } else {
        vnodes.push(<span class='title-container'><span slot='title' class='text'><p>{(title)}</p></span></span>)
      }
    } else if (title) {
      if (showSuffix) {
        vnodes.push(<span class='title-container w-auto' style='padding-left: 2rem;'><span slot='title' class='text'><p>{(title)}</p></span><span><i class='el-submenu__icon-arrow el-icon-arrow-right mr-1'></i></span></span>)
      } else {
        vnodes.push(<span class='title-container w-auto' style='padding-left: 2rem;'><span slot='title' class='text'><p>{(title)}</p></span></span>)
      }
    }
    return vnodes
  }
}
</script>
