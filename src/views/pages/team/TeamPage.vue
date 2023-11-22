<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';
    import data from './team.json';

    const TableComponent = defineAsyncComponent(() => import('@/components/table-components/TableComponent.vue'));

</script>

<template>
    <div>
        <TableComponent
            :table-headers="data.inputs"
            :title="data.config.name"
            :endpoint="data.config.API"
            link-text="addTeamMember"
        />
    </div>
</template>
