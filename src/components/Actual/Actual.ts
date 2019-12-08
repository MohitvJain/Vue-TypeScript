import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './Actual.html';
import { mapGetters } from 'vuex';
import { Category, Item } from '@/Expenses-Category/expenses';

@WithRender
@Component({
    computed: {
        ...mapGetters(['listofCategory'])
      }
})
export default class Actual extends Vue {
    private listofCategory!: Array<Category>;
    private selectedCategName: String = '';
    private itemModel: Item = new Item();
    public categIndex: number = -1;

    @Watch('listofCategory')
    selectedCateg(categ: Category): void {
        this.selectedCategName = categ.name;
        console.log('iviurivi')
        this.categIndex = this.listofCategory.findIndex((el) => el.name === categ.name)
    }

    public emitCategItems(): void {
        let categItem = this.itemModel;
        this.$parent.$emit('item', categItem, this.selectedCategName);
        this.onDestroy();
      }

      private onDestroy(): void {
        this.itemModel = new Item();
   }
}