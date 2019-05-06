<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <input type="text" v-model="title" placeholder="Title" class="mb-3 form-control">
            <wysiwyg v-model="content" />
            <div class="text-center mt-3">
              <button class="btn btn-success btn-lg">Create article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      content: ''
    }
  }
}
</script>
