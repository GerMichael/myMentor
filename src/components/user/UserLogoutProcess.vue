<template>
    <div>
        Signing out..
    </div>
</template>

<script>
export default {
    /**
     * If this component is created sign out the user
     * calls signOutUser action of store
     * if there is a positive response of the promise -> redirect to loggedout
     * otherwhise do nothing and log error
     */
    created(){
        this.$store.dispatch("signOutUser")
        .then(()=>{
            console.log("[UserLogoutProcess]: Successfully logged out!");
            this.$router.push("/loggedout");
        })
        .catch(error=>{
            if(error.response.status != 401) console.log("[UserLogoutProcess]: Error on signing out!", error);
            this.$router.push("/");
        });
    }
}
</script>