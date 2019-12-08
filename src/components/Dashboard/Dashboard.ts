import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './Dashboard.html';
import Planned from './../../views/Planned.vue';
import { Category, MonthExpense, Item } from '@/Expenses-Category/expenses';
import store from '@/store/index'
import { mapState, mapGetters } from 'vuex';

@WithRender
@Component({})
export default class Dashboard extends Vue {

    private monthExpense: Array<MonthExpense>;
    private month: Array<any> = [ "January", "February", "March", "April", "May", "June",
                                       "July", "August", "September", "October", "November", "December"];
    public currentMonth: String = '';
    public showComponent: boolean = false;

    constructor() {
        super();
        this.monthExpense = [];
    }

    created() {
        this.currentMonth = this.currentMonthData();
        this.trackMonthcat();
    }  

    trackMonthcat() {
        this.$store.dispatch("changeCurrentMonthState", this.currentMonth);
    }

    currentMonthData(monthIndex?: number) {
        let date = new Date();
        let index = this.month.findIndex((data) => data == this.currentMonth)
        let month = monthIndex ? this.month[index + monthIndex] : this.month[date.getMonth()];
        return month;
        }

    addWiseCategory(category: Category): void {
            const index = this.monthExpense.findIndex((data) => data.month === this.currentMonth);
            if(!(index >= 0)) {
                this.monthExpense.push({month: this.currentMonth, expense_planned: [category]});
            } else {
                this.monthExpense[index].expense_planned.push(category);
            }
        this.$store.dispatch("addWiseCategory", this.monthExpense);
    }

    addMonthCat(item: Item, categName: string) {
        const index = this.monthExpense.findIndex((el) => el.month === this.currentMonth);
        const categoryofIndex = index >= 0 ? this.monthExpense[index].expense_planned.findIndex((el)=> el.name === categName) : index;
            if(categoryofIndex >= 0) {
                this.monthExpense[index].expense_planned[categoryofIndex].items.push(item);
            }
            this.$store.dispatch("addWiseCategory", this.monthExpense);
    }


    getMonth(index: number) {
        if ((this.currentMonth != 'December') && index == 1) {
        this.currentMonth = this.currentMonthData(1);
        }
        else if ((this.currentMonth != 'January') && index == -1) {
        this.currentMonth = this.currentMonthData(-1);
        }
        }

}