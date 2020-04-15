<template>
    <div>
        <!--        导航区域-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--        卡片视图-->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
                </el-col>
            </el-row>
<!--            表格区域-->
            <el-table :data="rolesList" border stripe>
<!--                展开列-->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item1, i1) in scope.row.children"
                                :key="item1.id"
                                class="vcenter"
                                :class="['bdbottom', i1 === 0 ? 'bdtop' : '']">
<!--                            一级权限-->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row, item2.id)">
                                    {{ item1.authName }}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
<!--                            二级和三级权限-->
                            <el-col :span="19">
                                <el-row v-for="(item2, i2) in item1.children"
                                        :key="item2.id"
                                        class="vcenter"
                                        :class="['bdbottom', i2 === 0 ? 'bdtop' : '']">
                                    <el-col :span="6">
                                        <el-tag type="success"
                                                closable @close="removeRightById(scope.row, item2.id)">
                                            {{ item2.authName }}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag v-for="(item3) in item2.children"
                                                :key="item3.id"
                                                closable @close="removeRightById(scope.row, item3.id)"
                                                type="warning">
                                            {{ item3.authName }}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
<!--                索引列-->
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary"
                                   icon="el-icon-edit"  @click="showEditDialog(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger"
                                   icon="el-icon-delete" @click="removeRoleById(scope.row.id)">删除</el-button>
                        <el-button size="mini" type="warning"
                                   icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
<!--        添加角色-->
        <el-dialog
                title="添加角色"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" status-icon>
                <el-form-item label="名称" prop="roleName">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="roleDesc">
                    <el-input v-model="addForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>
        <!--        修改角色的对话框-->
        <el-dialog
                title="修改角色"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" status-icon>
                <el-form-item label="名称" prop="roleName">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="roleDesc">
                    <el-input v-model="editForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRoleInfo">确 定</el-button>
            </span>
        </el-dialog>
        <!--        分配权限的对话框-->
        <el-dialog
                title="分配权限"
                :visible.sync="setRightDialogVisible"
                width="50%"
                @close="setRightDialogClosed">
            <el-tree :data="rightsList" :props="treeProps" default-expand-all
                     show-checkbox node-key="id" :default-checked-keys="defKeys"
                     ref="treeRef"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allocateRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Roles",
        data() {
            return {
                rolesList: [],
                // 添加角色
                addDialogVisible: false,
                addForm: {
                    roleName: '',
                    roleDesc: ''
                },
                addFormRules: {
                    roleName: [
                        {required: true, message: '请输入角色描述', trigger: 'blur'},
                    ]
                },
                // 控制修改角色对话框的显示与隐藏
                editDialogVisible: false,
                editForm: {
                    roleId: '',
                    roleName: '',
                    roleDesc: ''
                },
                editFormRules: {
                    roleName: [
                        {required: true, message: '请输入角色描述', trigger: 'blur'},
                    ]
                },
                // 分配权限
                setRightDialogVisible: false,
                rightsList: [],
                // 树形空间属性绑定
                treeProps: {
                    label: 'authName',
                    children: 'children'
                },
                defKeys: [],
                roleId: ''
            }
        },
        methods: {
            async getRolesList() {
                const { data: res } = await this.$http.get('roles')
                if (res.meta.status !== 200) {
                    return this.$message.error('获取角色列表失败')
                }
                this.rolesList = res.data
            },
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
            },
            addRole() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return
                    const {data: res} = await this.$http.post('roles', this.addForm)
                    if (res.meta.status !== 201) {
                        return this.$message.error('添加角色失败')
                    }
                    this.$message.success('添加角色成功')
                    this.addDialogVisible = false
                    await this.getRolesList()
                })
            },
            // 修改角色
            async showEditDialog(id) {
                const {data: res} = await this.$http.get('roles/' + id)
                if (res.meta.status !== 200)
                    return this.$message.error('查询角色失败')
                this.editForm = res.data
                this.editDialogVisible = true
            },
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
            editRoleInfo() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid)
                        return
                    const {data: res} = await this.$http.put('roles/' + this.editForm.roleId,
                        {roleName: this.editForm.roleName, roleDesc: this.editForm.roleDesc})
                    // console.log(res)
                    if (res.meta.status !== 200)
                        return this.$message.error('更新用户信息失败')
                    this.editDialogVisible = false
                    await this.getRolesList()
                    this.$message.success('更新用户信息成功')
                })
            },
            // 删除角色
            async removeRoleById(id) {
                // 弹框询问提示
                const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err) // err => { return err }
                // confirm or cancel
                if (confirmResult !== 'confirm')
                    return this.$message.info('已取消删除')
                const {data: res} = await this.$http.delete('roles/' + id)
                if (res.meta.status !== 200)
                    return this.$message.error('删除角色失败')
                this.$message.success('删除角色成功')
                await this.getRolesList()
            },
            // 删除权限
            async removeRightById(role, rightId) {
                const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== 'confirm')
                    return this.$message.info('已取消删除')
                // 模版字符串中用${}中间使用js表达式
                const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
                if (res.meta.status !== 200)
                    return this.$message.error('删除权限失败')
                this.$message.success('删除权限成功')
                // await this.getRolesList() 这样会全部刷新页面
                role.children = res.data // 局部刷新
            },
            async showSetRightDialog(role) {
                this.roleId = role.id
                const {data: res} = await this.$http.get('rights/tree')
                if (res.meta.status !== 200)
                    return this.$message.error('获取权限数据失败')
                this.$message.success('获取权限数据成功')
                this.rightsList = res.data
                this.getDefKeys(role, this.defKeys)
                this.setRightDialogVisible = true

            },
            // 通过递归，获取所有三级权限的id，并保存defKeys
            getDefKeys(node, arr) {
                if (!node.children) {
                    return arr.push(node.id)
                }
                node.children.forEach(item => this.getDefKeys(item, arr))
            },
            // 清空复选框
            setRightDialogClosed() {
                this.defKeys = []
            },
            async allocateRights() {
                // 组合进数组，并转字符串
                const keys = [...this.$refs.treeRef.getCheckedKeys(),
                    ...this.$refs.treeRef.getHalfCheckedKeys()]
                const idStr = keys.join(',')
                const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`,
                    {rids: idStr})
                if (res.meta.status !== 200)
                    return this.$message.error('获取权限数据失败')
                this.$message.success('获取权限数据成功')
                await this.getRolesList()
                this.setRightDialogVisible = false
            }
        },
        created() {
            this.getRolesList()
        }
    }
</script>

<style scoped>
.el-tag {
    margin: 7px;
}

.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}
</style>
