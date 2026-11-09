import { createFileRoute } from '@tanstack/react-router'
import { ViewProfilePage } from '../../pages/mypage/view-profile-page'

export const Route = createFileRoute('/mypage/')({
  component: ViewProfilePage,
})
