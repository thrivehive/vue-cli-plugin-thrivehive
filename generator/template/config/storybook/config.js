/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import '@/utils/setup';

Vue.use(Vuetify, {
  iconfont: 'md'
});
addDecorator(withNotes);
addDecorator(() => ({
  template: '<v-app><story/></v-app>'
}));

const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
