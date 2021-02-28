import Model from "../Model"
import UserModel from "./UserModel"

export default class UserSettingModel extends Model {
    static name = 'UserSetting'
    static entity = 'user_settings'
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
            value: this.attr(null),

            user: this.belongsTo(UserModel, 'user_id')
        }
    }
}
