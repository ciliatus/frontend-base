import Model from "../Model"
import UserSettingModel from "./UserSettingModel"
import PermissionModel from "./PermissionModel"

export default class UserModel extends Model {
    static name = 'User'
    static entity = 'users'
    static package = 'common'
    static menu = false

    static getRelationNames () {
        return [
            'settings', 'permissions'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            email: this.attr(null),

            settings: this.hasMany(UserSettingModel, 'user_id'),
            permissions: this.hasMany(PermissionModel, 'user_id')
        }
    }
}
