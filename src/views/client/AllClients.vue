<template>
    <section class="container">
        <TableClients></TableClients>
    </section>
</template>

<script>
import TableClients from '@/components/client/TableClients.vue'

export default{
    name: 'AllClients',
    components: {
        TableClients
    }
}
</script>