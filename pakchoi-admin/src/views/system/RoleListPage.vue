<template>
  <div class="role-list-page">
    <l-screen-bar
      addBtnText="添加角色"
      :keyWordsPlaceholder="['角色','code']"
      :word-key="['roleName','roleCode']"
      :vlaues="sceneValue"
      @click-search="searchData"
      @click-add="showFormDialog"
      @click-clear-all="clearAllSearch"
    ></l-screen-bar>

    <l-table
      :table-data="tableData"
      :table-props="tableProps"
      :loading="loading"
      :page-size.sync="page.pageSize"
      :current-page.sync="page.currentPage"
      :total="total"
      @click-row="showLBoard"
      @change-page="_getData"
    >
      <template v-slot:avatar="{row}">
        <img :src="row.avatarUrl" alt class="avatar" />
      </template>
    </l-table>
    <l-board :content="rowDetail" :visible.sync="rowDetailvisible">
      <template v-slot:topbar>
        <div>
          <!-- <h4>{{content.test}}</h4> -->
          <el-button size="small" type="danger" @click="deleteTableRow">删除</el-button>
          <el-button size="small" type="primary" @click="showFormDialog(rowDetail)">编辑</el-button>
        </div>
      </template>
      <template v-slot:content></template>
    </l-board>

    <l-dialog
      :visible.sync="visibleForm"
      @click-confirm="addUpdateTableRow"
      @click-canecl="closeFormDialog"
      @click-reset="resetFormDialog"
      :loading="confirmLoading"
    >
      <l-form :model="form" :items="formItems" ref="form"></l-form>
    </l-dialog>
  </div>
</template>
<script>
import TableListMixins from "@/mixins/TableListMixins";
import {
  getMenuOptions,
  getRoleList,
  addRole,
  updateRole,
  deleteRoleItem
} from "@/api/system";
import { dateText } from "@/utils/util";
import { getTreeData } from "@/utils/util";

export default {
  name: "RoleListPage",
  mixins: [TableListMixins],
  data() {
    return {
      sceneValue: "",
      tableProps: [
        {
          label: "角色名称",
          prop: "roleName"
        },
        {
          label: "code",
          prop: "roleCode"
        },
        {
          label: "备注",
          prop: "remark"
        },
        {
          label: "创建人",
          prop: "createBy"
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
          label: "角色名称",
          prop: "roleName",
          rules: "required",
          component: "LInput"
        },
        {
          label: "code",
          prop: "roleCode",
          rules: "required",
          component: "LInput"
        },
        {
          label: "菜单授权",
          prop: "authList",
          data: [],
          defaultProps: { label: "title" },
          treeDataType: "key",
          rules: "required",
          component: "LTree"
        },
        {
          label: "备注",
          prop: "remark",
          type: "textarea",
          component: "LInput"
        }
      ],

      api: {
        list: getRoleList,
        add: addRole,
        update: updateRole,
        delete: deleteRoleItem
      }
    };
  },
  async mounted() {
    try {
      const result = await getMenuOptions();
      if (!this.reqMsg(result, false)) return;
      this.formItems[2].data = getTreeData(result.data, null, "parentId");
    } catch (error) {
      console.log(error.message);
    }
    this._getData();
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.role-list-page {
}
</style>