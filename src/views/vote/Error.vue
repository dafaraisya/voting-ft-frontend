<template>
	<div class="error">
		<b-card class="card">
			<b-card-text class="text-white">
			<h2 class="mb-4">Oppps :(</h2>
			<h5 v-if=" this.$route.params.error == 'failed-not-found'">
			Maaf data QR Code tidak ditemukan
			</h5>
			<h5 v-if=" this.$route.params.error == 'failed-already-vote'">
			Maaf anda sudah melakukan pemilihan
			</h5>
			<h5 v-if=" this.$route.params.error == 'failed-not-your-session'">
			Maaf saat ini bukan sesi anda
			</h5> 
			</b-card-text>
			<b-button @click="back=true" class="btn">Beranda</b-button>
			<router-link v-if="back" :to="this.$router.go(-3)">
			</router-link>
		</b-card>
	</div>
</template>
<script>
export default {
	name: 'Error',
	data() {
		return {
			back :false
		}
	}

}
</script>
<style scoped>
	.error{
		max-width: 500px;
		margin: auto;
		margin-top: 180px;
	}
	.tanda-silang{
		max-width: 120px;
	}
	.btn{
		padding: 10px 30px;
		background-color: rgba(0,0,0,0);
		border-color: rgb(255,255,255);
	}
	.btn {
		padding: 10px 30px;
		background-color: rgba(0,0,0,0);
		border-color: rgb(255,255,255);
	}

	.btn:hover {
		background-color: rgb(255,255,255);
		color: rgb(0,0,0)
	}

	.card{
		padding: 10px 30px;
		background-color: rgba(0,0,0,0);
		border-color: rgb(255,255,255);
	}
</style>