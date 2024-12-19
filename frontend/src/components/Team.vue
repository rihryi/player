<template>
    <div>
        <div class="team_list">
            <ul>
                <li @click="goToPosition('GEN.G')">
                    <div class="logo_img">
                        <img src="../img/GEN.G.png" alt="젠지">
                    </div>
                    <div class="logo_txt">
                        <p>GEN.G</p>
                    </div>
                </li>
                <li @click="goToPosition('T1')">
                    <div class="logo_img">
                        <img src="../img/T1.png" alt="T1">
                    </div>
                    <div class="logo_txt">
                        <p>T1</p>
                    </div>
                </li>
                <li @click="goToPosition('KT')">
                    <div class="logo_img">
                        <img src="../img/KT.png" alt="KT">
                    </div>
                    <div class="logo_txt">
                        <p>KT</p>
                    </div>
                </li>
                <li @click="goToPosition('Dplus-KIA')">
                    <div class="logo_img">
                        <img src="../img/Dplus-KIA.png" alt="디플러스기아">
                    </div>
                    <div class="logo_txt">
                        <p>Dplus-KIA</p>
                    </div>
                </li>
                <li @click="goToPosition('한화생명')">
                    <div class="logo_img">
                        <img src="../img/한화생명.png" alt="한화생명">
                    </div>
                    <div class="logo_txt">
                        <p>한화생명</p>
                    </div>
                </li>
                <li @click="goToPosition('FearX')">
                    <div class="logo_img">
                        <img src="../img/FearX.png" alt="FearX">
                    </div>
                    <div class="logo_txt">
                        <p>FearX</p>
                    </div>
                </li>
                <li @click="goToPosition('광동프릭스')">
                    <div class="logo_img">
                        <img src="../img/광동프릭스.png" alt="광동프릭스">
                    </div>
                    <div class="logo_txt">
                        <p>광동프릭스</p>
                    </div>
                </li>
                <li @click="goToPosition('BRION')">
                    <div class="logo_img">
                        <img src="../img/BRION.png" alt="BRION">
                    </div>
                    <div class="logo_txt">
                        <p>BRION</p>
                    </div>
                </li>
                <li @click="goToPosition('DRX')">
                    <div class="logo_img">
                        <img src="../img/DRX.png" alt="DRX">
                    </div>
                    <div class="logo_txt">
                        <p>DRX</p>
                    </div>
                </li>
                <li @click="goToPosition('NSRedforce')">
                    <div class="logo_img">
                        <img src="../img/NSRedforce.png" alt="NsRedforce">
                    </div>
                    <div class="logo_txt">
                        <p>NsRedforce</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Team',
    methods: {
        goToPosition(teamName) {
            this.$router.push(`/position/${teamName}`);
        }
    }
}
</script>

<style scoped>
.logo_img {
    width: 5vw;
}
</style>

<!-- <template>
  <div>
      <div class="team_list">
          <ul>
              <li v-for="team in teams" :key="team" @click="goToPosition(team)">
                  <img :src="`../img/${team}.png`" :alt="team" />
                  {{ team }}
              </li>
          </ul>
      </div>
  </div>
  </template>
  
  <script>
  export default {
      name: 'Team',
      data() {
          return {
              teams: ['GEN.G', 'T1', 'KT', 'Dplus-KIA', '한화생명', 'FearX', '광동프릭스', 'BRION', 'DRX', 'NSRedforce']
          };
      },
      methods: {
          goToPosition(teamName) {
              this.$router.push(`/position/${teamName}`);
          }
      }
  }
  </script> -->