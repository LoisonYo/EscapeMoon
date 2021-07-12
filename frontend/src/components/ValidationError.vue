<template>
    <div v-if="validationErrors">
        <ul class="alert alert-danger">
          <li v-for="(value, key, index) in validationErrors">@{{ value }}</li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>