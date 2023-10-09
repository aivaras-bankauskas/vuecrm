<script setup lang="ts">
    import { defineAsyncComponent, ref, reactive, nextTick } from 'vue';
    import { validateForm } from '@/core/utilities/validation/validation-hendler';
    import APIService from '@/core/services/api-service';
    import UserInterface from '@/interfaces/UserInterface';

    const InputComponent = defineAsyncComponent(() => import('@/components/input-components/InputComponent.vue'));

    const isFormValid = ref(true);
    const isFormSubmitted = ref(false);
    const inputErrors = reactive<{ [key: string]: string[] }>({});

    const formData = reactive<UserInterface>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleInputErrors = (inputName: string, newErrors: string[]): void => {
        validateForm({ inputName, newErrors, inputErrors, isFormValid });
    };

    const handleSubmit = async (): Promise<void> => {
        isFormSubmitted.value = true;
        await nextTick();
        if (isFormValid.value) {
            await APIService.store('/users', formData);
            isFormSubmitted.value = false;
        }
    };
</script>

<template>
    <div class="flex min-h-full flex-col py-10 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
                <div class="mt-10">
                    <form class="space-y-6" @submit.prevent="handleSubmit">
                        <InputComponent
                            v-model="formData.firstName"
                            input-name="firstName"
                            input-type="text"
                            :validation="['required']"
                            :is-form-submitted="isFormSubmitted"
                            @update:errors="errors => handleInputErrors('firstName', errors)"
                        />
                        <InputComponent
                            v-model="formData.lastName"
                            input-name="lastName"
                            input-type="text"
                            :validation="['required']"
                            :is-form-submitted="isFormSubmitted"
                            @update:errors="errors => handleInputErrors('lastName', errors)"
                        />
                        <InputComponent
                            v-model="formData.email"
                            input-name="email"
                            input-type="email"
                            :validation="['required','email']"
                            :is-form-submitted="isFormSubmitted"
                            @update:errors="errors => handleInputErrors('email', errors)"
                        />
                        <InputComponent
                            v-model="formData.password"
                            input-name="password"
                            input-type="password"
                            :validation="['required']"
                            :is-form-submitted="isFormSubmitted"
                            @update:errors="errors => handleInputErrors('password', errors)"
                        />
                        <div>
                            <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
