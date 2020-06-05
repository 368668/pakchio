import LTable from "@/components/table/LTable.vue";
import LScreenBar from "@/components/table/LScreenBar.vue";
import LBoard from "@/components/table/LBoard.vue";
import LDialog from "@/components/public/LDialog.vue";
import LForm from "@/components/form/LForm.vue";
import {
  filetrObj
} from "@/utils/util"

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      total: 0,
      page: {
        currentPage: 1,
        pageSize: 10,
        keyWords: null,
        queryList: []
      },

      //list form
      visibleForm: false,
      confirmLoading: false,

      //row 详情
      rowDetailvisible: false,
      rowDetail: {}
    }
  },
  computed: {
    getPageParams() {
      return Object.assign({}, this.page)
    }
  },
  methods: {
    /**
     * 显示 row 详情 */
    showLBoard(value) {
      this.rowDetail = value
      this.rowDetailvisible = true
    },


    /**
     * 显示表单弹出 */
    showFormDialog(data) {
      this.form = data == undefined ?
        Object.assign({}, this.formDefault || null) :
        Object.assign({}, data.row);
      this.visibleForm = true;
    },
    /**
     * 关闭表单弹出 */
    closeFormDialog() {
      this.resetFormDialog()
      this.visibleForm = false
    },
    /**
     *  重置表单 */
    resetFormDialog() {
      if (this.$refs.form != undefined) {
        this.$refs.form.resetFields()
      }
    },


    /**
     * 增删改查 */
    async _getData() {
      this.loading = true;
      try {
        const result = await this.api.list(this.getPageParams);
        this.loading = false;
        if (!this.reqMsg(result, false)) return;
        this.tableData = result.data.list;
        this.total = result.data.total;
      } catch (error) {
        this.tableData = [];
        this.total = 0;
      }
    },
    /**
     * 关键词搜索 */
    searchData(value) {
      this.page.keyWords = value;
      this._getData();
    },
    clearAllSearch() {
      this.page.keyWords = '';
      this._getData();
    },
    async addUpdateTableRow() {
      if (!this.$refs.form.validate()) return;
      this.confirmLoading = true;
      try {
        const result =
          this.form._id == undefined ?
          await this.api.add(this.form) :
          await this.api.update(this.form);
        this.confirmLoading = false;
        if (!this.reqMsg(result)) return;
        this.closeFormDialog();
        this.rowDetailvisible = false;
        this._getData && this._getData();
      } catch (error) {
        this.confirmLoading = false;
        console.log(error.message);
      }
    },
    async deleteTableRow() {
      this.$confirm("是否确认删除", "提示", {
          type: "warning"
        })
        .then(async () => {
          try {
            const result = await this.api.delete({
              _id: this.rowDetail.row._id
            });
            if (!this.reqMsg(result)) return;
            this.rowDetailvisible = false;
            this._getData && this._getData();
          } catch (error) {
            console.log(error.message);
          }
        })
        .catch(() => {});
    }
  },
  components: {
    LTable,
    LBoard,
    LScreenBar,
    LDialog,
    LForm
  }
}
