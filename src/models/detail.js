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
                const { data } = await api.getTopicById(id)
                this.setTopicDetail(data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
