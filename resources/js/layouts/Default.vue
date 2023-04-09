<template>
    <Head>
        <meta
            v-for="(tag, index) in metaTags"
            :key="index"
            :head-key="tag.name ?? tag.property"
            v-bind="tag"
        />
        <meta name="static" content="content" />
    </Head>
    <header class="bg-blue-800">
        <div class="container mx-auto text-white py-4">Header</div>
    </header>
    <main class="grow">
        <slot></slot>
    </main>
    <footer class="bg-slate-800">
        <div class="container mx-auto text-white py-4">Footer</div>
    </footer>
</template>

<script setup>
import { Head } from "@inertiajs/vue3";
import { computed } from "vue";

const metaTags = computed(() => [
    {
        name: "description",
        content: "The description meta tag",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "http://inertia-ssr.test/" },
    {
        property: "og:title",
        content: "The og title",
    },
    {
        property: "og:description",
        content: "The og description",
    },
    { name: "twitter:card", content: "The twitter card" },
    { name: "twitter:site", content: "website" },
    {
        name: "twitter:title",
        content: "Twitter title",
    },
    {
        name: "twitter:description",
        content: "Twitter description",
    },
]);
</script>
