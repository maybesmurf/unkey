<template>
  <div>
    <h1>You can see the state if you hit this with an <code>Authorization</code> header</h1>
    <pre>Authorization: {{ header }}</pre>
    <pre>{{ verifiedState }}</pre>
  </div>
</template>

<script setup>
const _verifiedState = useState(() => ({ unkey: useRequestEvent()?.context?.unkey }));
const _header = useState(() => useRequestEvent()?.headers?.authorization);
</script>
