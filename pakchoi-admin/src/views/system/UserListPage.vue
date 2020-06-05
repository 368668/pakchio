<template>
  <div class="user-list-page">
    <l-screen-bar :vlaues="sceneValue" @click-search="_getData" @click-add="showFormDialog"></l-screen-bar>

    <l-table
      :table-data="tableData"
      :table-props="tableProps"
      :loading="loading"
      :page-size="page.size"
      :current-page="page.currentPage"
      :total="total"
      @click-row="showLBoard"
      @change-page="_getData"
    >
      <template v-slot:avatar="{row}">
        <el-avatar :size="48" :src="row.avatarUrl"></el-avatar>
      </template>
    </l-table>

    <l-board :content="rowDetail" :visible.sync="rowDetailvisible">
      <template v-slot:topbar>
        <div>
          <el-button size="small" type="danger" @click="deleteTableRow">删除</el-button>
          <el-button size="small" type="primary" @click="showFormDialog(rowDetail)">编辑</el-button>
        </div>
      </template>
      <template v-slot:content></template>
    </l-board>

    <l-dialog
      :visible.sync="visibleForm"
      :loading="confirmLoading"
      @click-confirm="addUpdateTableRow"
      @click-canecl="closeFormDialog"
      @click-reset="resetFormDialog"
    >
      <l-form :model="form" :items="formItems" ref="form"></l-form>
    </l-dialog>
  </div>
</template>
<script>
import TableListMixins from "@/mixins/TableListMixins";
import { getUserslist, getRoleOptions, updateUserManage } from "@/api/system";
import { dateText } from "@/utils/util";

export default {
  name: "UserListPage",
  mixins: [TableListMixins],
  data() {
    return {
      sceneValue: "",
      tableProps: [
        {
          label: "用户名",
          prop: "userName"
        },
        {
          label: "头像",
          slot: "avatar",
          width: 70
        },
        {
          label: "手机号码",
          prop: "mobile"
        },
        {
          label: "邮箱",
          prop: "email"
        },
        {
          label: "性别",
          prop: "gender"
        },
        {
          label: "角色",
          prop: "roleName"
        },
        {
          label: "角色CODE",
          prop: "roleCode"
        },
        {
          label: "状态",
          prop: "status"
        },
        {
          label: "创建时间",
          prop: "createDate",
          formatter: row => dateText(row.createDate)
        }
      ],

      form: {},
      formItems: [
        {
          label: "手机号码",
          prop: "mobile",
          type: "tel",
          rules: [
            {
              required: true,
              pattern: /^\w{11}$/,
              message: "请输入手机号码",
              trigger: "blur"
            }
          ],
          component: "LInput"
        },
        {
          label: "邮箱",
          prop: "email",
          type: "email",
          rules: [
            {
              pattern: this.rules.regexp.email,
              required: true,
              message: "邮箱格式不正确",
              trigger: "blur"
            }
          ],
          component: "LInput"
        },
        {
          label: "性别",
          prop: "gender",
          rules: "required",
          component: "LRadio",
          options: [
            {
              label: "男",
              value: "1"
            },
            {
              label: "女",
              value: "2"
            }
          ]
        },
        {
          label: "角色",
          prop: "roleId",
          rules: "required_change",
          component: "LSelect",
          optionLabel: "roleName",
          optionValue: "_id",
          changeCallback: this.changeRole
        },
        {
          label: "状态",
          prop: "status",
          rules: "required_change",
          component: "LSelect",
          options: [
            {
              label: "启用",
              value: "1"
            },
            {
              label: "禁用",
              value: "0"
            },
            {
              label: "待审核",
              value: "-1"
            }
          ]
        }
      ],

      api: {
        list: getUserslist,
        update: updateUserManage
      }
    };
  },
  async mounted() {
    const result = await getRoleOptions();
    if (this.reqMsg(result, false)) {
      this.formItems[3].options = result.data;
    }
    this._getData();
  },
  methods: {
    // async _getData() {
    //   this.loading = true;
    //   const result = await getUserslist(this.getPageParams);
    //   this.loading = false;
    //   if (!this.reqMsg(result, false)) return;
    //   this.tableData = result.data.list;
    //   this.page.total = result.data.total;
    // }
    changeRole({ item, value }) {
      this.form.roleName =
        item.options.find(i => i.roleCode === value).roleName || null;
    }
  }
};
</script>
<style lang="scss" scoped>
.user-list-page {
}
</style>