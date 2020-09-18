<template>
  <div class="contact">
    <h1>Contact Ballot Drop</h1>
    <span v-if="success">Your message was submitted. We'll be in touch soon!</span>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
      >
        <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
            name="_replyto"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Message:" label-for="input-3">
        <b-form-textarea
            id="input-3"
            v-model="form.message"
            required
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>


  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        message: '',
      },
      success: false,
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      axios.post("https://formspree.io/xbjprngw",this.form)
          .then(res => {
                if( res.status === 200 && res.data.ok === true) {
                  this.success = true;
                }
              }
          )

    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.message = ''

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },

}
</script>