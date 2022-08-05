<template>
  <div v-loading="dataLoading">
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm">
        <template v-if="device === 'mobile'">
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-select v-model="searchTimeType" filterable class="gameResultTimeType">
                <el-option v-for="item in gameResultTimeType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-date-picker
                v-model="searchForm.searchTime"
                type="datetimerange"
                align="right"
                unlink-panels
                :range-separator="$t('__to')"
                :start-placeholder="`${$t('__createdAt')}(${$t('__start')})`"
                :end-placeholder="`${$t('__createdAt')}(${$t('__end')})`"
                :picker-options="pickerOptions"
                :default-time="['12:00:00', '11:59:59']"
              />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.round_id" :placeholder="$t('__roundId')" />
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.table_id" multiple filterable :collapse-tags="tableIdCollapse" :placeholder="$t('__tableId')">
                <el-option v-for="item in searchItems.tables" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.gameType" multiple filterable :collapse-tags="gameTypeCollapse" :placeholder="$t('__gameType')">
                <el-option v-for="item in searchItems.gameType" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
                <el-option v-for="item in searchItems.gamePaymentStatus" :key="item.key" :label="item.nickname" :value="item.key" />
              </el-select>
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.banker_points" :placeholder="$t('__bankerPoints')" type="number" />
            </p>
            <p class="optionItem">
              <el-input v-model="searchForm.player_points" :placeholder="$t('__playerPoints')" type="number" />
            </p>
          </div>
          <div class="view-container-seachForm-operate">
            <p class="operateItem">
              <el-button class="bg-gray" size="mini" @click="onReset()">{{ $t("__reset") }}</el-button>
            </p>
            <p class="operateItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(1)">{{ $t("__search") }}</el-button>
            </p>
          </div>
        </template>
        <template v-else>
          <div ref="seachFormExpand" class="view-container-seachForm-option">
            <p class="optionItem">
              <el-button class="bg-yellow" size="mini" @click="handleCurrentChange(currentPage)">{{ $t("__refresh") }}</el-button>
            </p>
            -
          </div>
        </template>
      </div>
      <div ref="table" class="view-container-table">
        <div v-if="tableData.length > 0">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <template v-if="device === 'mobile'">
              <div class="info">
                <div class="field">
                  <span class="title">{{ $t('__gameType') }}</span>
                  <span class="news">{{ item.game_type }}</span>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__tableId') }}</span>
                  <span class="news">{{ item.table_id }}</span>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__gameStartTime') }}</span>
                  <span class="news">{{ item.game_start_time }}</span>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__gameEndTime') }}</span>
                  <span class="news">{{ item.game_end_time }}</span>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__roundId') }}</span>
                  <span class="news">{{ item.round_id }}</span>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__gameResult') }}</span>
                  <template slot-scope="scope">
                    <div v-if="scope.row.gameResult.result !== -1">
                      <div class="gameResult">
                        <i class="el-icon-picture playbackIcon" @click="onPlaybackPic(scope.row)" />
                        <img class="playbackIcon" :src="require(`@/assets/gameResult/playbackUrl.png`)" @click="onPlaybackUrl(scope.row)">
                      </div>
                      <div class="gameResult">
                        <el-popover
                          :ref="`roadInfo-${scope.row.round_id}`"
                          placement="bottom-end"
                          :visible-arrow="false"
                          :popper-class="gameResultPopperClassName"
                        >
                          <div>
                            <div v-if="showRoadInfo" class="roadInfo">
                              <div>
                                <div class="roadInfoContent">
                                  {{ `${$t('__gameType')}: ${roundInfo.gameType}` }}
                                </div>
                                <div class="roadInfoContent">
                                  {{ `${$t('__roundId')}: ${roundInfo.roundId}` }}
                                </div>
                              </div>
                              <div>
                                <div class="roadInfoContent">
                                  {{ `${$t('__gameStartTime')}: ${roundInfo.startTime}` }}
                                </div>
                                <div class="roadInfoContent">
                                  {{ `${$t('__gameEndTime')}: ${roundInfo.endTime}` }}
                                </div>
                              </div>
                              <div>
                                <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeGameResultPopover(scope.row.round_id)">
                                  <i class="el-dialog__close el-icon el-icon-close" />
                                </button>
                              </div>
                              <div>
                                <div class="pokerInfo">
                                  <div class="playerArea">
                                    <div class="word blue-color">{{ $t('__player') }}</div>
                                    <img class="player3Poker" :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[2]}.png`)" alt="">
                                    <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[0]}.png`)" alt="">
                                    <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.PlayerCard[1]}.png`)" alt="">
                                  </div>
                                  <div class="bankerArea">
                                    <div class="word red-color">{{ $t('__banker') }}</div>
                                    <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.BankerCard[0]}.png`)" alt="">
                                    <img class="poker" :src="require(`@/assets/poker/${roundInfo.result.BankerCard[1]}.png`)" alt="">
                                    <img class="banker3Poker" :src="require(`@/assets/poker/${roundInfo.result.BankerCard[2]}.png`)" alt="">
                                  </div>
                                  <table class="roundInfo">
                                    <tr>
                                      <td class="yellow-color">
                                        {{ `${$t('__totalLength')}: ` }}
                                      </td>
                                      <td class="white-color floatRight">
                                        {{ countInfo.total }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                      <td class="green-color">
                                        {{ `${$t('__tie')}: ` }}
                                      </td>
                                      <td class="white-color floatRight">
                                        {{ countInfo.tie }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="red-color">
                                        {{ `${$t('__banker')}: ` }}
                                      </td>
                                      <td class="white-color floatRightr">
                                        {{ countInfo.banker }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                      <td class="blue-color">
                                        {{ `${$t('__player')}: ` }}
                                      </td>
                                      <td class="white-color floatRight">
                                        {{ countInfo.player }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="red-color">
                                        {{ `${$t('__bankerPair')}: ` }}
                                      </td>
                                      <td class="white-color floatRight">
                                        {{ countInfo.bankerPair }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                      <td class="blue-color">
                                        {{ `${$t('__playerPair')}: ` }}
                                      </td>
                                      <td class="white-color floatRight">
                                        {{ countInfo.playerPair }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="red-color">
                                        {{ `${$t('__bankerContinuousWin')}: ` }}
                                      </td>
                                      <td class="white-color floatRight">
                                        {{ countInfo.bankerInstantWin }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                      <td class="blue-color">
                                        {{ `${$t('__playerContinuousWin')}: ` }}
                                      </td>
                                      <td class="white-color floatRight">
                                        {{ countInfo.playerInstantWin }}
                                      </td>
                                      <td class="white-color">
                                        {{ $t('__round') }}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                              <el-table
                                :data="bigRoad.roadData"
                                :show-header="false"
                                :border="true"
                              >
                                <el-table-column
                                  v-for="{ prop } in bigRoad.roadDataFormat"
                                  :key="prop"
                                  align="center"
                                  class-name="roadColumn"
                                  :width="20"
                                >
                                  <template slot-scope="roadData">
                                    <div class="bigRoad">
                                      <div
                                        :class="{
                                          'bigRoad-current': roadData.row[prop].split('_')[3] === '1'
                                        }"
                                      />
                                      <div
                                        :class="{
                                          'bigRoad-winner-banker': roadData.row[prop].split('_')[0] === '1',
                                          'bigRoad-winner-player': roadData.row[prop].split('_')[0] === '2'
                                        }"
                                      />
                                      <div
                                        :class="{
                                          'bigRoad-pair-banker': roadData.row[prop].split('_')[1] === '1' || roadData.row[prop].split('_')[1] === '3',
                                        }"
                                      />
                                      <div
                                        :class="{
                                          'bigRoad-pair-player': roadData.row[prop].split('_')[1] === '2' || roadData.row[prop].split('_')[1] === '3',
                                        }"
                                      />
                                      <div
                                        v-if="roadData.row[prop].split('_')[0] === '3' && roadData.row[prop].split('_')[2] >= 1"
                                        class="bigRoad-tieCount"
                                      >
                                        {{ (Number(roadData.row[prop].split('_')[2]) + 1) }}
                                      </div>
                                      <div
                                        v-else-if="roadData.row[prop].split('_')[0] === '3' || roadData.row[prop].split('_')[2] === '1'"
                                        class="bigRoad-winner-tie"
                                      />
                                      <div
                                        v-else-if="roadData.row[prop].split('_')[2] > 1"
                                        class="bigRoad-tieCount"
                                      >
                                        {{ roadData.row[prop].split('_')[2] }}
                                      </div>
                                    </div>
                                  </template>
                                </el-table-column>
                              </el-table>
                              <el-table
                                :data="bigEyeRoad.roadData"
                                :show-header="false"
                                :border="true"
                                class="threeSmallRoadTable"
                              >
                                <el-table-column
                                  v-for="{ prop } in bigEyeRoad.roadDataFormat"
                                  :key="prop"
                                  align="center"
                                  class-name="threeSmallRoadColumn"
                                  :width="10"
                                >
                                  <template slot-scope="roadData">
                                    <div class="threeSmallRoad">
                                      <div
                                        :class="{
                                          'bigRoad-current': roadData.row[prop].split('_')[1] === '1'
                                        }"
                                      />
                                      <div
                                        :class="{
                                          'bigEyeRoad-winner-banker': roadData.row[prop].split('_')[0] === '1',
                                          'bigEyeRoad-winner-player': roadData.row[prop].split('_')[0] === '2'
                                        }"
                                      />
                                    </div>
                                  </template>
                                </el-table-column>
                              </el-table>
                              <div class="road-row">
                                <div class="road-col">
                                  <el-table
                                    :data="smallEyeRoad.roadData"
                                    :show-header="false"
                                    :border="true"
                                    class="threeSmallRoadTable"
                                  >
                                    <el-table-column
                                      v-for="{ prop } in smallEyeRoad.roadDataFormat"
                                      :key="prop"
                                      align="center"
                                      class-name="threeSmallRoadColumn"
                                      :width="10"
                                    >
                                      <template slot-scope="roadData">
                                        <div class="threeSmallRoad">
                                          <div
                                            :class="{
                                              'bigRoad-current': roadData.row[prop].split('_')[1] === '1'
                                            }"
                                          />
                                          <div
                                            :class="{
                                              'smallEyeRoad-winner-banker': roadData.row[prop].split('_')[0] === '1',
                                              'smallEyeRoad-winner-player': roadData.row[prop].split('_')[0] === '2'
                                            }"
                                          />
                                        </div>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                </div>
                                <div class="road-col">
                                  <el-table
                                    :data="cockroachRoad.roadData"
                                    :show-header="false"
                                    :border="true"
                                    class="threeSmallRoadTable"
                                  >
                                    <el-table-column
                                      v-for="{ prop } in cockroachRoad.roadDataFormat"
                                      :key="prop"
                                      align="center"
                                      class-name="threeSmallRoadColumn"
                                      :width="10"
                                    >
                                      <template slot-scope="roadData">
                                        <div class="threeSmallRoad">
                                          <div
                                            :class="{
                                              'bigRoad-current': roadData.row[prop].split('_')[1] === '1'
                                            }"
                                          />
                                          <div
                                            :class="{
                                              'cockroachRoad-winner-banker': roadData.row[prop].split('_')[0] === '1',
                                              'cockroachRoad-winner-player': roadData.row[prop].split('_')[0] === '2'
                                            }"
                                          />
                                        </div>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                </div>
                              </div>
                              <el-table
                                :data="beadRoad.roadData"
                                :show-header="false"
                                :border="true"
                              >
                                <el-table-column
                                  v-for="{ prop } in beadRoad.roadDataFormat"
                                  :key="prop"
                                  align="center"
                                  class-name="roadColumn"
                                  :width="20"
                                >
                                  <template slot-scope="roadData">
                                    <div class="beadRoad">
                                      <div
                                        :class="{
                                          'bigRoad-current': roadData.row[prop].split('_')[2] === '1'
                                        }"
                                      />
                                      <div
                                        :class="{
                                          'beadRoad-winner-banker': roadData.row[prop].split('_')[0] === '1',
                                          'beadRoad-winner-player': roadData.row[prop].split('_')[0] === '2',
                                          'beadRoad-winner-tie': roadData.row[prop].split('_')[0] === '3'
                                        }"
                                      />

                                      <div
                                        :class="{
                                          'beadRoad-content-banker': roadData.row[prop].split('_')[0] === '1',
                                          'beadRoad-content-player': roadData.row[prop].split('_')[0] === '2',
                                          'beadRoad-content-tie': roadData.row[prop].split('_')[0] === '3'
                                        }"
                                      />

                                      <div
                                        :class="{
                                          'bigRoad-pair-banker': roadData.row[prop].split('_')[1] === '1' || roadData.row[prop].split('_')[1] === '3',
                                        }"
                                      />
                                      <div
                                        :class="{
                                          'bigRoad-pair-player': roadData.row[prop].split('_')[1] === '2' || roadData.row[prop].split('_')[1] === '3',
                                        }"
                                      />
                                    </div>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </div>
                            <div v-else class="fakeRoadInfo" />
                          </div>
                          <template slot="reference">
                            <div class="wrap" @click="gameResultClick(scope.row.round_id)">
                              <div
                                class="display_inline"
                                :class="{
                                  'banker': scope.row.gameResult.result === 0,
                                  'player': scope.row.gameResult.result === 1,
                                  'tie': scope.row.gameResult.result === 2
                                }"
                              >
                                {{ scope.row.gameResult.resultLabel }}
                              </div>
                              <div class="display_inline">
                                {{ scope.row.gameResultPoints }}
                              </div>
                            </div>
                          </template>
                        </el-popover>
                      </div>
                    </div>
                    <div v-else>-</div>
                  </template>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__status') }}</span>
                  <span class="news">{{ item.game_payment_status_name }}</span>
                </div>
                <div class="field">
                  <span class="title">{{ $t('__operate') }}</span>
                  <template slot-scope="scope">
                    <div>
                      <div v-if="scope.row.has_mod_billing_status === 1">
                        <div v-if="scope.row.game_payment_status === 2" class="checkboxGroup">
                          -
                        </div>
                        <div v-else class="checkboxGroup">
                          <el-checkbox
                            v-model="scope.row.invalidRound"
                            class="red-tick"
                            :label="$t('__invalidRound')"
                            @mousedown.native="onOperateCheckboxClick(dialogEnum.billingStatus, scope.row)"
                          />
                        </div>
                      </div>
                      <div v-else>-</div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
            <template v-else>
              -
            </template>
          </div>
        </div>
        <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
      </div>
    </div>

    <div class="view-footer">
      <el-pagination
        layout="prev, pager, next, jumper, sizes"
        :total="totalCount"
        background
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :current-page.sync="currentPage"
        @size-change="handleSizeChangeByClient"
        @current-change="handleCurrentChange"
      />
    </div>
    <operateDialog
      ref="invalidRoundDialog"
      :visible="curDialogIndex === dialogEnum.billingStatus"
      :content="$stringFormat($t('__gameRoundInvalidMsg'), operateDialogMsgParameter)"
      :form="editForm"
      @close="closeDialogEven"
      @onSubmit="operateSubmit"
    />

    <playbackDialog
      v-if="curPlaybackIndex === playbackEnum.pic"
      :title="playbackTitle"
      :visible="curPlaybackIndex === playbackEnum.pic"
      :playback-type="playbackEnum.pic"
      :url="imagePlaybackpic"
      @close="closePlaybackDialogEven"
    />

    <playbackDialog
      v-if="curPlaybackIndex === playbackEnum.video"
      :title="playbackTitle"
      :visible="curPlaybackIndex === playbackEnum.video"
      :playback-type="playbackEnum.video"
      :url="videoPlaybackUrl"
      @close="closePlaybackDialogEven"
    />

  </div>
</template>

<script>
import { gameResultSearch, gameResultGetPlaybackUrl, gameResultGetPlaybackPic, gameResultGetScoreCards, gameResultModBillingStatus } from '@/api/gameResult'
import common from '@/mixin/common';
import viewCommon from '@/mixin/viewCommon';
import handlePageChange from '@/mixin/handlePageChange';
import handleSearchFormOpen from '@/mixin/handleSearchFormOpen';
import { getFullDate, getYesterdayDateTime, getTodayDateTime, getLastWeekDateTime,
  getThisWeekDateTime, getLastMonthDateTime, getThisMonthDateTime } from '@/utils/transDate'
import { mapGetters } from 'vuex'
import { getRoadArray } from '@/utils/roadLogic'
import OperateDialog from '@/views/gameResult/operateDialog'
import PlaybackDialog from '@/views/gameResult/playbackDialog'

const defaultSearchTimeType = 'startTime'
const defaultSearchTime = getTodayDateTime()
const road = {
  roadData: [[]],
  roadDataFormat: []
}
const roundInfo = {
  result: {
    PlayerCard: ["None", "None", "None"],
    BankerCard: ["None", "None", "None"]
  }
}

export default {
  name: 'GameResult',
  components: { OperateDialog, PlaybackDialog },
  mixins: [common, viewCommon, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: this.$t('__yesterday'),
          onClick(picker) {
            picker.$emit('pick', getYesterdayDateTime())
          }
        }, {
          text: this.$t('__today'),
          onClick(picker) {
            picker.$emit('pick', getTodayDateTime())
          }
        }, {
          text: this.$t('__lastWeek'),
          onClick(picker) {
            picker.$emit('pick', getLastWeekDateTime())
          }
        }, {
          text: this.$t('__thisWeek'),
          onClick(picker) {
            picker.$emit('pick', getThisWeekDateTime())
          }
        }, {
          text: this.$t('__lastMonth'),
          onClick(picker) {
            picker.$emit('pick', getLastMonthDateTime())
          }
        }, {
          text: this.$t('__thisMonth'),
          onClick(picker) {
            picker.$emit('pick', getThisMonthDateTime())
          }
        }]
      },
      dialogEnum: Object.freeze({
        'none': 0,
        'billingStatus': 1
      }),
      playbackEnum: Object.freeze({
        'none': 0,
        'pic': 1,
        'video': 2
      }),
      searchTimeType: defaultSearchTimeType,
      searchTime: defaultSearchTime,
      searchForm: {},
      searchItems: {},
      playbackPic: undefined,
      playbackUrl: undefined,
      showRoadInfo: false,
      roundInfo: JSON.parse(JSON.stringify(roundInfo)),
      countInfo: {},
      bigRoad: JSON.parse(JSON.stringify(road)),
      bigEyeRoad: JSON.parse(JSON.stringify(road)),
      smallEyeRoad: JSON.parse(JSON.stringify(road)),
      cockroachRoad: JSON.parse(JSON.stringify(road)),
      beadRoad: JSON.parse(JSON.stringify(road)),
      curDialogIndex: 0,
      editForm: {},
      operateDialogMsgParameter: [],
      playbackTitle: "",
      curPlaybackIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'gameResultTimeType'
    ]),
    imagePlaybackpic() {
      return this.playbackPic
    },
    videoPlaybackUrl() {
      return this.playbackUrl
    },
    gameResultPopperClassName() {
      return this.showRoadInfo ? '' : 'display_none'
    },
    tableIdCollapse() {
      return this.searchForm.table_id && this.searchForm.table_id.length > this.selectCollapseCount
    },
    gameTypeCollapse() {
      return this.searchForm.gameType && this.searchForm.gameType.length > this.selectCollapseCount
    },
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount
    }
  },
  watch: {
    'searchTime': function() {
      this.$nextTick(() => {
        this.handleCurrentChange(1)
      })
    }
  },
  created() {
    this.$store.dispatch('gameResult/setGameResultTimeType')
    this.handleCurrentChange(this.currentPage)
  },
  methods: {
    onOperateCheckboxClick(operateType, rowData) {
      this.editForm = { round_id: rowData.round_id }
      switch (operateType) {
        case this.dialogEnum.billingStatus: {
          this.curDialogIndex = this.dialogEnum.billingStatus
          this.operateDialogMsgParameter = [rowData.round_id]
          break
        }
      }
    },
    operateSubmit(data) {
      switch (this.curDialogIndex) {
        case this.dialogEnum.billingStatus: {
          this.$refs.invalidRoundDialog.setDialogLoading(true)
          gameResultModBillingStatus(data).then((res) => {
            const element = this.tableData.find(item => item.round_id === data.round_id)
            if (element) {
              element.game_payment_status = res.game_payment_status
              element.game_payment_status_name = res.game_payment_status_name
              element.invalidRound = element.game_payment_status === 1
            }
            this.$refs.invalidRoundDialog.setDialogLoading(false)
            this.closeDialogEven()
          }).catch(() => {
            this.$refs.invalidRoundDialog.setDialogLoading(false)
          })
          break
        }
      }
    },
    closeGameResultPopover(round_id) {
      this.$refs[`roadInfo-${round_id}`].doClose()
    },
    gameResultClick(round_id) {
      this.showRoadInfo = false
      const data = { round_id: round_id }
      this.dataLoading = true
      this.bigRoad = JSON.parse(JSON.stringify(road))
      this.bigEyeRoad = JSON.parse(JSON.stringify(road))
      this.smallEyeRoad = JSON.parse(JSON.stringify(road))
      this.cockroachRoad = JSON.parse(JSON.stringify(road))
      this.beadRoad = JSON.parse(JSON.stringify(road))
      this.roundInfo = JSON.parse(JSON.stringify(roundInfo))
      this.countInfo = {}
      gameResultGetScoreCards(data).then((res) => {
        this.roundInfo = res.roundInfo
        this.countInfo = res.countInfo

        if (this.roundInfo.result.PlayerCard.length === 2) {
          this.roundInfo.result.PlayerCard.push('None')
        }
        if (this.roundInfo.result.BankerCard.length === 2) {
          this.roundInfo.result.BankerCard.push('None')
        }

        var scoreCards = res.scoreCards
        {
          const bigRoad = getRoadArray(0, scoreCards.toString(), res.roundInfo.scoreCardsId)
          var bigRoadLastIndex = 0
          for (let i = 0, max = bigRoad.length; i < max; i++) {
            for (let j = 0, jMax = bigRoad[i].length; j < jMax; j++) {
              if (bigRoad[i][j] !== "" && bigRoadLastIndex < j + 1) {
                bigRoadLastIndex = j + 1
              }
            }
          }
          if (bigRoadLastIndex < 26) {
            bigRoadLastIndex = 26
          }
          this.bigRoad.roadData = bigRoad
          this.bigRoad.roadDataFormat = []
          for (let i = 0; i < bigRoadLastIndex; i++) {
            this.bigRoad.roadDataFormat.push({ prop: i.toString() })
          }
        }

        {
          const bigEyeRoad = getRoadArray(2, scoreCards.toString(), res.roundInfo.scoreCardsId)
          var bigEyeRoadLastIndex = 0
          for (let i = 0, max = bigEyeRoad.length; i < max; i++) {
            for (let j = 0, jMax = bigEyeRoad[i].length; j < jMax; j++) {
              if (bigEyeRoad[i][j] !== "" && bigEyeRoadLastIndex < j + 1) {
                bigEyeRoadLastIndex = j + 1
              }
            }
          }
          if (bigEyeRoadLastIndex < 52) {
            bigEyeRoadLastIndex = 52
          }
          this.bigEyeRoad.roadData = bigEyeRoad
          this.bigEyeRoad.roadDataFormat = []
          for (let i = 0; i < bigEyeRoadLastIndex; i++) {
            this.bigEyeRoad.roadDataFormat.push({ prop: i.toString() })
          }
        }

        {
          const smallEyeRoad = getRoadArray(3, scoreCards.toString(), res.roundInfo.scoreCardsId)
          var smallEyeRoadLastIndex = 0
          for (let i = 0, max = smallEyeRoad.length; i < max; i++) {
            for (let j = 0, jMax = smallEyeRoad[i].length; j < jMax; j++) {
              if (smallEyeRoad[i][j] !== "" && smallEyeRoadLastIndex < j + 1) {
                smallEyeRoadLastIndex = j + 1
              }
            }
          }
          if (smallEyeRoadLastIndex < 26) {
            smallEyeRoadLastIndex = 26
          }
          this.smallEyeRoad.roadData = smallEyeRoad
          this.smallEyeRoad.roadDataFormat = []
          for (let i = 0; i < smallEyeRoadLastIndex; i++) {
            this.smallEyeRoad.roadDataFormat.push({ prop: i.toString() })
          }
        }

        {
          const cockroachRoad = getRoadArray(4, scoreCards.toString(), res.roundInfo.scoreCardsId)
          var cockroachRoadLastIndex = 0
          for (let i = 0, max = cockroachRoad.length; i < max; i++) {
            for (let j = 0, jMax = cockroachRoad[i].length; j < jMax; j++) {
              if (cockroachRoad[i][j] !== "" && cockroachRoadLastIndex < j + 1) {
                cockroachRoadLastIndex = j + 1
              }
            }
          }
          if (cockroachRoadLastIndex < 26) {
            cockroachRoadLastIndex = 26
          }
          this.cockroachRoad.roadData = cockroachRoad
          this.cockroachRoad.roadDataFormat = []
          for (let i = 0; i < cockroachRoadLastIndex; i++) {
            this.cockroachRoad.roadDataFormat.push({ prop: i.toString() })
          }
        }

        {
          const beadRoad = getRoadArray(1, scoreCards.toString(), res.roundInfo.scoreCardsId)
          var beadRoadLastIndex = 0
          for (let i = 0, max = beadRoad.length; i < max; i++) {
            for (let j = 0, jMax = beadRoad[i].length; j < jMax; j++) {
              if (beadRoad[i][j] !== "" && beadRoadLastIndex < j + 1) {
                beadRoadLastIndex = j + 1
              }
            }
          }
          if (beadRoadLastIndex < 26) {
            beadRoadLastIndex = 26
          }
          this.beadRoad.roadData = beadRoad
          this.beadRoad.roadDataFormat = []
          for (let i = 0; i < beadRoadLastIndex; i++) {
            this.beadRoad.roadDataFormat.push({ prop: i.toString() })
          }
        }

        this.showRoadInfo = true
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onReset() {
      this.searchForm = {}
      this.searchTimeType = defaultSearchTimeType
      this.searchTime = defaultSearchTime
      this.handleCurrentChange(1)
    },
    handleRequest(data) {
      this.dataLoading = true
      const searchTime = []
      if (!this.searchTime) {
        this.searchTime = defaultSearchTime
      }
      this.searchTime.forEach(element => {
        searchTime.push(getFullDate(element))
      })
      data[this.searchTimeType] = searchTime
    },
    handleRespone(res) {
      this.searchForm[this.searchTimeType] = undefined
      this.searchItems = res.searchItems
      this.tableData = res.rows
      this.tableData.forEach(element => {
        const winner = this.searchItems.gameResult.find(item => item.key === element.gameResult.result)
        if (winner) {
          element.gameResult.resultLabel = winner.nickname
        }
        const player = this.searchItems.gameResult.find(item => item.key === 1)
        const banker = this.searchItems.gameResult.find(item => item.key === 0)
        if (player && banker) {
          const playerPoint = element.gameResult.player_point
          const bankerPoint = element.gameResult.banker_point
          const pointResult = player.nickname + playerPoint + ' ' + banker.nickname + bankerPoint
          element.gameResultPoints = '[' + pointResult + ']'
        }

        element.invalidRound = element.game_payment_status === 1
      })
      this.totalCount = res.totalCount
      this.dataLoading = false
    },
    onPlaybackPic(row) {
      this.dataLoading = true
      this.playbackTitle = `${this.$t('__gameType')} ${row.game_type} ${this.$t('__tableId')} ${row.table_id} ${this.$t('__roundId')} ${row.round_id}`
      gameResultGetPlaybackPic({ round_id: row.round_id }).then((res) => {
        this.playbackPic = res.playbackPic
        this.curPlaybackIndex = this.playbackEnum.pic
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onPlaybackUrl(row) {
      this.dataLoading = true
      this.playbackTitle = `${this.$t('__gameType')} ${row.game_type} ${this.$t('__tableId')} ${row.table_id} ${this.$t('__roundId')} ${row.round_id}`
      gameResultGetPlaybackUrl({ round_id: row.round_id }).then((res) => {
        this.playbackUrl = res.playbackUrl
        this.curPlaybackIndex = this.playbackEnum.video
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
      })
    },
    onSubmit() {
      this.searchForm.page = this.currentPage
      this.searchForm.rowsCount = this.pageSize
      this.handleRequest(this.searchForm)
      gameResultSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.dataLoading = false
      })
    },
    closePlaybackDialogEven() {
      this.curPlaybackIndex = this.playbackEnum.none
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    }
  }
}
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
</style>
