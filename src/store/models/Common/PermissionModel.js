import Model from "../Model"
import UserModel from "./UserModel"

export default class PermissionModel extends Model {
    static name = 'Permission'
    static entity = 'permission'
    static package = 'common'
    static menu = false

    static getRelationNames () {
        return [
            'user'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            package: this.attr(null),
            action: this.attr(null),

            user: this.belongsTo(UserModel, 'user_id')
        }
    }
}
