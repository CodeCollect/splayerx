<template>
  <div class="cont" v-fade-in="showAllWidgets || progressTriggerStopped">
    <div class="timing"
      :data-component-name="$options.name"
      @mousedown="switchTimeContent">
          <span class="timeContent" ref="timeContent" :class="{ remainTime: isRemainTime }" v-if="hasDuration"></span>
    </div>
    <Labels class="rate"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { videodata } from '../../store/video';
import Labels from './Labels.vue';

export default {
  name: 'the-time-codes',
  components: {
    Labels,
  },
  props: ['showAllWidgets'],
  data() {
    return {
      isRemainTime: false,
      progressTriggerStopped: false,
      progressTriggerId: 0,
      progressDisappearDelay: 1000,
    };
  },
  computed: {
    ...mapGetters(['duration', 'rate', 'singleCycle']),
    hasDuration() {
      return !Number.isNaN(this.duration);
    },
  },
  watch: {
    rate() {
      if (!this.progressKeydown) {
        this.progressTriggerStopped = true;
        this.clock.clearTimeout(this.progressTriggerId);
        this.progressTriggerId = this.clock.setTimeout(() => {
          this.progressTriggerStopped = false;
        }, this.progressDisappearDelay);
      }
    },
    singleCycle() {
      this.progressTriggerStopped = true;
      this.clock.clearTimeout(this.progressTriggerId);
      this.progressTriggerId = this.clock.setTimeout(() => {
        this.progressTriggerStopped = false;
      }, this.progressDisappearDelay);
    },
  },
  methods: {
    switchTimeContent() {
      this.isRemainTime = !this.isRemainTime;
      if (this.$refs.timeContent) {
        if (this.isRemainTime) {
          this.$refs.timeContent.textContent =
          this.timecodeFromSeconds(Math.floor(this.duration) - Math.floor(videodata.time));
        } else {
          this.$refs.timeContent.textContent =
          this.timecodeFromSeconds(Math.floor(videodata.time));
        }
      }
    },
    updateTimeContent(time) {
      if (this.$refs.timeContent) {
        this.$refs.timeContent.textContent =
        this.timecodeFromSeconds(this.isRemainTime ?
          Math.floor(this.duration) - Math.floor(time) : Math.floor(time));
      }
    },
  },
  created() {
    this.$bus.$on('seek', () => {
      this.progressTriggerStopped = true;
      this.clock.clearTimeout(this.progressTriggerId);
      this.progressTriggerId = this.clock.setTimeout(() => {
        this.progressTriggerStopped = false;
      }, this.progressDisappearDelay);
    });
  },
};
</script>

<style lang="scss">
@media screen and (max-aspect-ratio: 1/1) and (max-width: 288px), screen and (min-aspect-ratio: 1/1) and (max-height: 288px) {
  .cont {
    bottom: 23px;
    left: 20px;
  }
  .timing {
    height: 18px;
    font-size: 18px;
    .secondContent {
      font-size: 13px;
    }
    .splitSign {
      font-size: 13px;
    }
  }
  .rate {
    margin: 4px 1px auto 7px;
  }
}
@media screen and (max-aspect-ratio: 1/1) and (min-width: 289px) and (max-width: 480px), screen and (min-aspect-ratio: 1/1) and (min-height: 289px) and (max-height: 480px) {
  .cont {
    bottom: 27px;
    left: 28px;
  }
  .timing {
     height: 20px;
     font-size: 18px;
     .secondContent {
       font-size: 14px;
     }
     .splitSign {
       font-size: 14px;
     }
   }
  .rate {
    margin: auto 2px 0 9px;
  }
}
@media screen and (max-aspect-ratio: 1/1) and (min-width: 481px) and (max-width: 1080px), screen and (min-aspect-ratio: 1/1) and (min-height: 481px) and (max-height: 1080px) {
  .cont {
    bottom: 34px;
    left: 33px;
  }
  .timing {
    height: 24px;
    font-size: 24px;
    .secondContent {
      font-size: 18px;
    }
    .splitSign {
      font-size: 18px;
    }
  }
  .rate {
    margin: auto 3px 0 11px;
  }
}
@media screen and (max-aspect-ratio: 1/1) and (min-width: 1080px), screen and (min-aspect-ratio: 1/1) and (min-height: 1080px) {
  .cont {
    bottom: 44px;
    left: 51px;
  }
  .timing {
    height: 36px;
    font-size: 36px;
    .secondContent {
      font-size: 26px;
    }
    .splitSign {
      font-size: 26px;
    }
  }
  .rate {
    margin: 9px 4px auto 13px;
  }
}
.cont {
  position: absolute;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  z-index: 5;
}
.timing {
  position: relative;
  width: auto;
  .timeContent {
    display: inline-block;
    color: rgba(255, 255, 255, 1);
    text-shadow:  0 1px 0 rgba(0,0,0,.1),
                  1px 1px 0 rgba(0,0,0,.1);
    font-weight: 600;
    letter-spacing: 0.9px;
    user-select: none;
  }

  .remainTime {
    &::before {
      content: '-';
      padding-right: 4px;
      font-weight: 600;
      display: inline-block;
    }
  }

  .splitSign {
    color: rgba(255, 255, 255, 0.5);
  }

}
.timing:hover {
  cursor: pointer;
}

.timing .timing--current {
  opacity: 1;
}
</style>
