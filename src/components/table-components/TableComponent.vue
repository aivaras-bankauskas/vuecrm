<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import APIService from '@/core/services/api-service';
    import InputInterface from '@/core/interfaces/InputInterface';
    import FormDataInterface from '@/core/interfaces/FormDataInterface';

    const props = defineProps<{
        tableHeaders: InputInterface[];
        title: string;
        endpoint: string;
        linkText: string;
    }>();

    const { t } = useI18n();
    const tableData = ref<FormDataInterface[]>([]);

    onMounted(() => {
        getTableData();
    });

    const getTableData = async (): Promise<void> => {
        const response = await APIService.getAll(props.endpoint);
        tableData.value = response.data.data;
    };
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table class="w-full text-sm text-left text-color">
            <caption class="p-5 text-lg font-semibold text-left text-color bg-white">
                <div class="flex justify-between">
                    {{ t(`navigation.${title}`) }}
                    <RouterLink
                        :to="`${endpoint}/create`"
                        class="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {{ t(`labels.${linkText}`) }}
                    </RouterLink>
                </div>
            </caption>
            <thead class="text-xs text-color uppercase bg-white">
                <tr>
                    <th v-for="(header, index) in tableHeaders" :key="index" scope="col" class="px-6 py-3">
                        {{ t(`labels.${header.inputName}`) }}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">view</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(listItem, index) in tableData" :key="index" class="bg-white border-b border-gray-light hover:bg-gray-light">
                    <td v-for="(item, secondIndex) in tableHeaders" :key="secondIndex" class="px-6 py-4">
                        {{ listItem[item.inputName] }}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <RouterLink
                            :to="`/${title}/${listItem.id}/edit`"
                            class="font-medium text-primary hover:underline"
                        >
                            {{ t(`buttons.edit`) }}
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
