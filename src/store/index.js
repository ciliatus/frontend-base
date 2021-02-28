import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import VuexORM from "@vuex-orm/core"
import VuexORMAxios from "@vuex-orm/plugin-axios"
import models from "./models"

Vue.use(Vuex)

const database = new VuexORM.Database()
VuexORM.use(VuexORMAxios, { axios })

Object.keys(models).forEach((model) => {
  database.register(models[model])
})

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store
