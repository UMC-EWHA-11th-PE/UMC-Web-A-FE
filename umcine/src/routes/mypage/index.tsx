import { createFileRoute } from '@tanstack/react-router'
import { viewProfilePage } from '../../pages/mypage/view-profile-page'

export const Route = createFileRoute('/mypage/')({
  component: viewProfilePage,
})
