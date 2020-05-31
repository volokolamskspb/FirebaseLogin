<template>
  <div class="vue-tempalte">
    <!-- Main -->
    <div class="App">
      <v-app>
      <div class="vertical-center">
        <div class="inner-block" v-show="!loading">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </v-app>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['loading'])
}
</script>