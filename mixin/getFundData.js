import axios from "axios";

export default {
  methods: {
    async getInitFundData(url) {
      const result = await axios({
        method: 'get',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res)
      .catch(err => alert(err))
      return result
    },
  },
}
