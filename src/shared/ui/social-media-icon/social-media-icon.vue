<script lang="ts" setup>
import LogosFacebook from '~icons/logos/facebook'
import LogosInstagramIcon from '~icons/logos/instagram-icon'
import { SocialMediaEnum } from './constants'
import LogosTiktokIcon from '~icons/logos/tiktok-icon'
import LogosYoutubeIcon from '~icons/logos/youtube-icon'

const props = defineProps<{
  socialMedia: SocialMediaEnum
}>()
</script>

<template>
  <LogosFacebook v-if="props.socialMedia === SocialMediaEnum.Facebook" />
  <LogosInstagramIcon v-else-if="props.socialMedia === SocialMediaEnum.Instagram" />
  <LogosTiktokIcon v-else-if="props.socialMedia === SocialMediaEnum.Tiktok" />
  <LogosYoutubeIcon v-else-if="props.socialMedia === SocialMediaEnum.Youtube" />
  <template v-else>
    {{ props.socialMedia }}
  </template>
</template>
