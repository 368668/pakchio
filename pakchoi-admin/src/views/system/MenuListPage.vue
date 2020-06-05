<template>
  <div class="menu-list-page">
    <l-screen-bar
      :vlaues="sceneValue"
      @click-add="showAddLBoard"
      @click-search="_getData"
      add-btn-text="添加菜单"
    ></l-screen-bar>

    <l-table
      :table-data="tableData"
      :table-props="tableProps"
      :loading="loading"
      :tree-props="{children: 'children'}"
      @click-row="showMenuLBoard"
      :usePageInation="false"
    >
      <template v-slot:icon="{row}">
        <div class="table-icon">
          <i :class="row.icon"></i>
          <span>{{row.icon}}</span>
        </div>
      </template>
    </l-table>

    <l-board
      :content="rowDetail"
      :visible.sync="rowDetailvisible"
      :board-footer="true"
      @click-confirm="submitMenu"
    >
      <template v-slot:topbar>
        <div>
          <el-button size="small" type="danger" @click="deleteMenu">删除</el-button>
          <el-button size="small" type="primary" @click="addChildMenu">添加子菜单</el-button>
        </div>
      </template>
      <template v-slot:content>
        <el-form :model="menuModel" label-width="8em" ref="form" class="form">
          <el-form-item porp="menuType" label="菜单类型" :rules="rules.required_change">
            <p v-if="menuModel._id!=undefined">{{menuModel.menuType |dictText('menuType')}}</p>
            <el-radio-group v-model="menuModel.menuType" @change="changeMenuType" v-else>
              <el-radio label="1">主菜单</el-radio>
              <el-radio label="2">子菜单</el-radio>
              <el-radio label="3">按钮菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="title" label="标题" :rules="rules.required">
            <el-input v-model.trim="menuModel.title"></el-input>
          </el-form-item>
          <el-form-item
            v-if="menuModel.menuType!='1'"
            :rules="rules.required_change"
            prop="parentId"
            label="父级菜单"
          >
            <el-select v-model="menuModel.parentId" filterable>
              <el-option
                v-for="(item,index) in parentOptions"
                :key="index"
                :value="item._id"
                :label="item.title"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="path" label="菜单路径" :rules="rules.required">
            <el-input v-model.trim="menuModel.path"></el-input>
          </el-form-item>
          <el-form-item prop="component" label="前端组件" :rules="rules.required">
            <el-input v-model.trim="menuModel.component"></el-input>
          </el-form-item>
          <el-form-item prop="componentName" label="组件名称" :rules="rules.required">
            <el-input v-model.trim="menuModel.componentName"></el-input>
          </el-form-item>
          <el-form-item prop="redirect" label="重定向">
            <el-input v-model.trim="menuModel.redirect"></el-input>
          </el-form-item>
          <el-form-item prop="icon" label="icon">
            <el-input v-model.trim="menuModel.icon"></el-input>
          </el-form-item>
          <el-form-item prop="sort" label="排序">
            <el-input-number v-model="menuModel.sort" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item prop="keepAlive" label="缓存路由">
            <el-switch v-model="menuModel.keepAlive"></el-switch>
          </el-form-item>
          <el-form-item prop="hidden" label="隐藏路由">
            <el-switch v-model="menuModel.hidden"></el-switch>
          </el-form-item>
        </el-form>
      </template>
    </l-board>
  </div>
</template>
<script>
import TableListMixins from "@/mixins/TableListMixins";
import { getMenuList, addMenu, updateMenu, deleteMenuItem } from "@/api/system";
import { getTreeData } from "@/utils/util";

export default {
  name: "MenuListPage",
  mixins: [TableListMixins],
  data() {
    return {
      sceneValue: "",

      tableProps: [
        {
          label: "菜单名称",
          prop: "title"
        },
        {
          label: "菜单icon",
          slot: "icon"
        },
        {
          label: "路由",
          prop: "path"
        },
        {
          label: "前端组件",
          prop: "component"
        },
        {
          label: "组件名称",
          prop: "componentName"
        },
        {
          label: "重定向",
          prop: "redirect"
        },
        {
          label: "排序",
          prop: "sort"
        },
        {
          label: "是否隐藏",
          prop: "hidden",
          formatter: row => (row.keepAlive ? "是" : "否")
        },
        {
          label: "缓存路由",
          prop: "keepAlive",
          formatter: row => (row.keepAlive ? "是" : "否")
        }
      ],

      menuModel: {
        menuType: "1",
        sort: 0
      },
      parentOptions: []
    };
  },
  mounted() {
    this._getData();
  },
  methods: {
    async _getData() {
      this.loading = true;
      const result = await getMenuList();
      this.loading = false;
      if (!this.reqMsg(result, false)) return;
      this.parentOptions = result.data;
      this.tableData = getTreeData(result.data, null, "parentId");
    },
    async submitMenu() {
      if (!this.validateForm(this.$refs.form)) return;
      const result =
        typeof this.menuModel._id == "undefined"
          ? await addMenu(this.menuModel)
          : await updateMenu(this.menuModel);
      if (!this.reqMsg(result)) return;
      this.$refs.form.resetFields();
      this.rowDetailvisible = false;
      this._getData();
    },
    deleteMenu() {
      this.$confirm("是否确认删除菜单", "提示", {
        type: "warning"
      })
        .then(async () => {
          const result = await deleteMenuItem({ _id: this.menuModel._id });
          if (!this.reqMsg(result)) return;
          this.rowDetailvisible = false;
          this._getData();
        })
        .catch(() => {});
    },
    showMenuLBoard({ row }) {
      this.menuModel = Object.assign({}, row);
      delete this.menuModel.children;
      this.showLBoard(row);
    },
    showAddLBoard() {
      this.menuModel = {
        menuType: "1",
        sort: 0
      };
      this.rowDetailvisible = true;
    },
    addChildMenu() {
      this.menuModel.title = undefined;
      this.menuModel.path = undefined;
      this.menuModel.component = undefined;
      this.menuModel.icon = undefined;
      this.menuModel.componentName = undefined;
      this.menuModel.menuType = "2";
      this.menuModel.sort = 0;
      this.menuModel.parentId = this.menuModel._id;
      delete this.menuModel._id;
    },
    /**
     * change 菜单类型
     */
    changeMenuType(val) {
      if (val == "1") {
        this.menuModel.parentId = null;
      } else {
        this.menuModel.parentId = this.menuModel._id || null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-list-page {
  .form {
    width: 500px;
  }
  .table-icon {
    span {
      padding-left: 12px;
    }
  }
}
</style>