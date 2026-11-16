import { createFileRoute } from '@tanstack/react-router'
import { ProtectedLayout } from '../../../pages/mypage/protected-layout'
import { useAuthStore } from '../../../stores/auth-store'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/_protected')({
  beforeLoad: () => {
    const accessToken = useAuthStore.getState().accessToken

    if (!accessToken) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: ProtectedLayout,
})

