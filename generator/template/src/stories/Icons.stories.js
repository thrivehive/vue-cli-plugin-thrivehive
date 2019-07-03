/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

storiesOf('Icons/Logo', module)
  .add('Default', () => ({
    render() {
      return (
        <logo class="ma-4" />
      );
    }
  }))
  .add('Dark', () => ({
    render() {
      return (
        <v-app dark>
          <logo class="ma-4" dark />
        </v-app>
      );
    }
  }));
