<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <template v-if="stats == 'ing'">
        <div class="title">내 주문 내역</div>
      </template>
      <template v-else-if="stats == 'cancel'">
        <div class="title">주문 취소 목록</div>
      </template>
      <div class="flex">
        <template v-for="(it, index) in orderInfo" :key="index">
          <div class="date">
            {{
              extrMonth(it.createAt) +
              1 +
              ". " +
              extrDate(it.createAt) +
              "(" +
              extrDay(it.createAt) +
              ")"
            }}
          </div>
          <div class="box">
            <div class="line1">
              <template v-if="'status' in it">
                <span>{{ it.status }}</span>
              </template>
              <template v-else>
                <span class="title">{{ it.status }}</span>
              </template>
            </div>
            <div class="line2">
              <img src="../../assets/shopLogo.png" />
              <div>
                <div class="ll1">
                  {{ it.orderName }}
                </div>
                <div class="ll2">
                  {{ it.price + "원" }}
                </div>
              </div>
            </div>
            <div class="line3">
              <template v-if="'status' in it && it.status == '배달 완료'">
                <div @click="openReviewModalf(it.idx)">리뷰 작성</div>
              </template>
              <template v-else-if="'status' in it && it.status == '배달 중'">
                <div @click="openCancelOrderModalf(it.idx)">취소하기</div>
              </template>
              <div @click="toPayDetail(it.idx)">결제 정보</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
    <ReviewModal :mode="mode" :idx="idx" v-if="openReviewModal" @closeReviewModal="openReviewModal = false" />
    <CancelOrderModal :idx="idx" v-if="openCancelOrderModal" @closeCancelOrderModal="openCancelOrderModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import ReviewModal from "../../components/review/ReviewModal.vue";
import CancelOrderModal from "../../components/order/CancelOrderModal.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import router from "../../router";

export default {
  name: "OrderView",
  props: {
    stats: String,
  },
  data() {
    return {
      openUserModal: false,
      openReviewModal: false,
      openCancelOrderModal: false,
      idx: 0,
      mode: 0,
    };
  },
  computed: {
    ...mapState("order", {
      orderInfo: (state) => state.orderInfo,
    }),
  },
  methods: {
    openReviewModalf(idx){
      this.idx = idx
      this.openReviewModal = true
    },
    openCancelOrderModalf(idx){
      this.idx = idx
      this.openCancelOrderModal = true
    },
    toPayDetail(idx){
      this.setIdx(idx)
      this.setViewStatus(0)
      router.push('/PayView')
    },
    ...mapMutations("order", ["setIdx", "setViewStatus"]),
    ...mapActions("order", ["getOrderInfo", "getCancelOderInfo"]),
    extrMonth(d) {
      return new Date(d).getUTCMonth();
    },
    extrDate(d) {
      return new Date(d).getDate();
    },
    extrDay(d) {
      if (new Date(d).getDay() == "0") {
        return "일";
      } else if (new Date(d).getDay() == "1") {
        return "월";
      } else if (new Date(d).getDay() == "2") {
        return "화";
      } else if (new Date(d).getDay() == "3") {
        return "수";
      } else if (new Date(d).getDay() == "4") {
        return "목";
      } else if (new Date(d).getDay() == "5") {
        return "금";
      } else if (new Date(d).getDay() == "6") {
        return "토";
      }
    },
  },
  components: {
    NavBar,
    UserModal,
    ReviewModal,
    CancelOrderModal
  },
  mounted() {
    const data = {
      stats: this.stats,
    };
    this.getOrderInfo(data);
  },
};
</script>

<style scoped>
.color {
  background-color: white;
}

.float {
  position: relative;
  top: 8rem;
}

.title {
  font-size: 2.4rem;
  font-weight: bold;
  width: 45rem;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.flex {
  display: flex;
  flex-direction: column;
}

.date {
  font-size: 1.2rem;
  width: 45rem;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  text-align: left;
}

.box {
  border: solid 1px rgba(128, 128, 128, 0.168);
  width: 45rem;
  margin: 0 auto;
  margin-bottom: 2rem;
}
.line1 {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  font-weight: bold;
}
.line2 {
  display: flex;
  margin-left: 0.5rem;
  margin-top: 0.7rem;
}
.line2 > img {
  flex-grow: 1;
  width: 4rem;
  border-radius: 6px;
}
.line2 > div {
  flex-grow: 5;
  padding-left: 1rem;
  float: left;
  width: calc(100% - 7rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ll1 {
  flex-grow: 5;
}
.ll2 {
  flex-grow: 3;
}
.line3 {
  display: flex;
  justify-content: space-around;
}
.line3 > div {
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
  padding: 0.15rem 5rem;
  border: solid 1px rgba(128, 128, 128, 0.168);
}
</style>
