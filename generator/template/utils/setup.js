import MyButton from '@/components/MyButton';

const components = [
  MyButton
];

export default (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
