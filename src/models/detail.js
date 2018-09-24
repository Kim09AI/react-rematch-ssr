export const detail = {
    state: {},
    reducers: {
        setTopicDetail(state, payload) {
            return payload
        }
    },
    effects: {
        async getTopicById(id, { api }) {
            try {
                const res = await api.getTopicById(id)
                this.setTopicDetail(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
