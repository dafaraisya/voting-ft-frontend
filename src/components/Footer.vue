<template>
  <!-- Footer Section Begin -->
  <footer class="footer-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="footer-left">
            <div class="footer-logo">
              <img
                class="rounded-circle"
                src="@/assets/logo kpr.png"
                alt=""
              />
            </div>
            <ul>
              <li>KPR FT UNS</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 text-left">
          <div class="footer-widget">
            <h5>Hubungi kami</h5>
            <ul>
              <li>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                  Facebook
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="far fa-envelope"></i>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 text-left">
          <div class="footer-widget">
            <h5>Tentang Kami</h5>
            <ul>
              <li>
                Alamat : <br />Jl. Ir. Sutami No.36, Kentingan, Kec. Jebres, Kota Surakarta, Jawa Tengah 57126
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright-reserved">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="copyright-text">
              Copyright &copy; 2020 All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer Section End -->
</template>

<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
.footer-section {
  background: #191919;
  padding-top: 75px;
}

.footer-left {
  margin-bottom: 30px;
}

.footer-left .footer-logo img {
  width: 100px;
  height: 100px !important;
}

.footer-left ul li {
  margin-left: -40px;
  margin-top: 10px;
  list-style: none;
  color: #b2b2b2;
  font-size: 16px;
  line-height: 30px;
}

.footer-widget {
  margin-bottom: 30px;
}

.footer-widget h5 {
  margin-left: 40px;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 26px;
}

.footer-widget ul li {
  list-style: none;
  color: #b2b2b2;
}

.footer-widget ul li a {
  line-height: 36px;
  font-size: 16px;
  color: #b2b2b2;
}

.copyright-reserved {
  border-top: 1px solid #303030;
  padding: 15px 0;
  margin-top: 45px;
}

.copyright-reserved .copyright-text {
  float: center;
  font-size: 16px;
  color: #b2b2b2;
}
</style>
