<template>
  <div class="about col-8 m-auto">
    <h1>Welcome to Ballot Drop.</h1>
    <h3>Our Reason for Being</h3>
    <p>Ballot Drop’s mission is to enable all voters to find their closest ballot drop-off location by identifying every drop box in the country. Yep, all of them.
    <p>Absentee or mail-in voting is likely the option many voters will choose given the challenges of this year’s election. As a non-partisan organization, Ballot Drop aims to support all voters in casting their ballots reliably and safely.
    <p>Ballot drop boxes, when available, allow voters to immediately cast their ballots without concern of postage, mail delays, or social distancing protocols.

    <h3>How it Works</h3>
    <p>Each state has different rules about how and where you can vote. Ballot Drop lists those rules on a state-by-state and county-by-county level. Select your state, then select your county to see all of the information we’ve collected.

    <h3>Keep in Mind</h3>
    <p>Ballot Drop is intended to be used as a reference, and we provide links to official source websites. The rules about this election change rapidly, so please confirm rules and locations with your state and local election officials if you have any questions or concerns.

    <h3>Want to Help?</h3>
    <p>Ballot Drop is a non-partisan volunteer effort. We’d love for you to get involved to help  source and update data, as well as improve the functionality of the site.
      <a href="https://join.slack.com/t/ballotdrop/shared_invite/zt-hdeyo1vk-VarchL5nx0ok1NpMfZh0fQ" target="_blank" rel="noreferrer">Join our slack to get started!</a>

    <h3>Questions?</h3>
    <router-link to="/contact">Head over to the contact page.</router-link>

    <h3>Let’s Be Social!</h3>
    <div class="row">
      <div class="col-4 social">
        <a href="http://instagram.com/ballotdrop" target="_blank" rel="noreferrer">
          <img src="../assets/instagram.svg" alt="@ballotdrop">
          @ballotdrop on Instagram
        </a>
      </div>

      <div class="col-4 social">
        <a href="https://www.facebook.com/ballotdrop" target="_blank" rel="noreferrer">
          <img src="../assets/facebook.svg" alt="@ballotdrop">
          @ballotdrop on Facebook
        </a>
      </div>

      <div class="col-4 social">
        <a href="https://twitter.com/ballotdrop" target="_blank" rel="noreferrer">
          <img src="../assets/twitter.svg" alt="@ballotdrop">
          @ballotdrop on Twitter
        </a>
      </div>
    </div>




  </div>
</template>


<style lang="scss" scoped>
  h3 {
    margin-top: 25px;
  }
  .about {
    .social {
      text-align: center;
    }
    img {
      width: 50px;
      display: block;
      margin: auto;
    }
  }

</style>
