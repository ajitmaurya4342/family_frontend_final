<template>
  <section class="section-connection-lost">
    <div class="text-center">
      <img
        src="@/assets/img/icons/connection-lost.svg"
        height="75"
        width="75"
        alt="Connection Lost"
      />

      <h6 class="mb-1">Oops!</h6>
      <h6 class="mb-5">Connection Lost</h6>
      <div class="proceed-btn">
        <button type="button" class="btn py-md-2 px-md-3">Retry</button>
      </div>
    </div>
  </section>
</template>

<style>
.section-connection-lost {
  width: 100%;
  height: 100vh;

  display: flex;

  align-items: center;
  justify-content: center;
}
</style>
