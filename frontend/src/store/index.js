import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL ="http://escape-moon/api"

export default new Vuex.Store({
    state:{
        token: localStorage.getItem('access_token') || null,
        authUser: null,
        saves: [],
        scenarios: [],
        scoreboard: [],
        trophies: [],
        scenarioEnd: false,

        current_scene: null,
        inventory: [],
    },
    getters:{
        loggedIn(state){
            return state.token !=null
        },

        registerErrors(state) {
            let errors = Object.values(state.registerErrors);
            errors = errors.flat();
            return errors;
        },
    },
    mutations:{
        retrieveToken(state,token){
            state.token = token
        },
        destroyToken(state){
            state.token = null
        },
        updateAuthUser(state,authUser){
            state.authUser = authUser
        },
        updateSaves(state, saves){
            state.saves = saves;
        },
        updateScenarios(state, scenarios){
            state.scenarios = scenarios;
        },
        updateCurrentScene(state, scene) {
            state.current_scene = scene;
        },
        updateInventory(state, inventory) {
            state.inventory = inventory;
        },
        addItemsInInventory(state, items) {
            items.forEach(element => {
                Vue.set(state.inventory, state.inventory.length, element);
            });
        },
        removeItemsInInventory(state, items) {
            
            items.forEach(element => {
                for(var i = 0; i < state.inventory.length; i++)
                {
                    var item = state.inventory[i];
                    if(item.item_id == element.item_id)
                    {
                        state.inventory.splice(i, 1);
                    }
                }
            });
        },
        updateScoreboard(state, scoreboard) {
            state.scoreboard = scoreboard;
        },
        updateTrophies(state, trophies) {
            state.trophies = trophies;
        },
        updateScenarioEnd(state, end) {
            state.scenarioEnd = end;
        },
    },
    actions:{
        async register(context, data){
            await axios.post("/register",{
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                })
        },
        
        async destroyToken({state, getters, commit}) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
      
            try {
                if (getters.loggedIn) {
                    await axios.post("/logout")
                    localStorage.removeItem("access_token")
                    commit("destroyToken")
                }
            }
            catch(error) {
                localStorage.removeItem("access_token")
                commit("destroyToken")
            }
        },

        async retrieveToken({commit}, credentials) {
            let response = await axios.post("/login", {
                username: credentials.username,
                password: credentials.password,
            })

            const token = response.data.access_token
            localStorage.setItem("access_token", token)
            commit("retrieveToken", token)
        },

        async fetchAuthUser({commit, state}) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.get("/user");
            commit("updateAuthUser", response.data)
        },

        async fetchScenarios({state, commit}) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.get("/scenarios");
            commit("updateScenarios", response.data);
        },

        async createSave({state, commit}) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.post("/save/create",{
                scenario_id: 1,
            });
            commit("updateSaves", response.data);
        },

        async deleteSave({state, commit}, data) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.post("/save/delete",{
                saved_scenario_id: data.saved_scenario_id,
            })
            commit("updateSaves", response.data);
        },

        async fetchSaves({state, commit}) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.get("/save");
            commit("updateSaves", response.data);
        },

        async resumeSave({state, commit}, data) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.post("/save/resume",{
                saved_scenario_id: data.saved_scenario_id,
            })
            commit("updateCurrentScene", response.data);
        },

        async fetchInventory({state, commit}) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.post("/inventory",{
                saved_scenario_id: state.current_scene.saved_scenario_id,
            });
            commit("updateInventory", response.data);
        },

        async sceneClick({state, commit}, data) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.post("/game/click", {
                saved_scene_id: state.current_scene.id,
                position: [data.positionX, data.positionY],
            });

            if(response.data.remove_items != undefined)
                commit("removeItemsInInventory", response.data.remove_items);
            if(response.data.add_items != undefined)
                commit("addItemsInInventory", response.data.add_items);
            if(response.data.change_scene != undefined)
                commit("updateCurrentScene", response.data.change_scene);
            if(response.data.end != undefined)
                commit("updateScenarioEnd", true);
        },

        async craft({state, commit}, data) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.post("/game/craft", {
                saved_scene_id: state.current_scene.id,
                first_item_id: data.first_item_id,
                second_item_id: data.second_item_id,
            });

            if(response.data.remove_items != undefined)
                commit("removeItemsInInventory", response.data.remove_items);
            if(response.data.add_items != undefined)
                commit("addItemsInInventory", response.data.add_items);
        },

        async fetchScoreboard({commit}) {
            let response = await axios.get("/scoreboard/escape_the_moon");
            commit("updateScoreboard", response.data)
        },

        async fetchTrophies({state, commit}) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + state.token
            let response = await axios.get("/trophies");
            commit("updateTrophies", response.data)
        },
    },
    modules: {
        
    }
})
