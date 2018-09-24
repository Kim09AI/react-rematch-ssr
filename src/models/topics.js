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
                const res = await api.getTopics()
                this.setTopics(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
