export const topics = {
    state: [],
    reducers: {
        setTopics(state, payload) {
            return payload
        }
    },
    effects: {
        async getTopics(payload, { api }) {
            try {
                const { data } = await api.getTopics()
                this.setTopics(data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
