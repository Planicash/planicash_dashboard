import { useEffect, useState } from "preact/hooks"
import { Bell, Check, X, DollarSign, CreditCard, TrendingUp, AlertCircle } from "lucide-preact"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Popover } from "@/components/ui/popover" // Tu Popover personalizado
import { mockNotifications } from "@/components/ui/notifications/utils/notifications.data"
import type { NotificationType } from "./utils/notifications"


export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<NotificationType[]>(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-blue-600" />
      case "income":
        return <TrendingUp className="h-4 w-4 text-emerald-600" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "system":
        return <Bell className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "transaction":
        return "bg-green-50 border-green-200"
      case "payment":
        return "bg-blue-50 border-blue-200"
      case "income":
        return "bg-emerald-50 border-emerald-200"
      case "alert":
        return "bg-orange-50 border-orange-200"
      case "system":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }
  useEffect(() => {
    if (notifications) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    }
  }, [notifications])

  return (
    <Popover
      trigger={
        <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
          <Bell className="btn-ghost size-9" size={20} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      }
    >
      <div className="w-96 p-0 card">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="card-title">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-slate-600 dark:text-slate-400">
              Mark all as read
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              <Bell className="h-12 w-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <Card
                    className={`card ${!notification.read
                      ? `${getNotificationColor(notification.type)} border-l-4`
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${!notification.read ? "text-slate-900 dark:text-slate-50" : "text-slate-600 dark:text-slate-400"}`}>
                                {notification.title}
                              </p>
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{notification.message}</p>
                            {notification.amount && (
                              <p className="text-xs font-semibold text-green-600 mt-1 dark:text-green-500">
                                ${notification.amount.toLocaleString()}
                              </p>
                            )}
                            <p className="text-xs text-slate-400 mt-2 dark:text-slate-500">{notification.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                              className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-950"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <Button variant="ghost" size="sm" className="w-full text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
              View all notifications
            </Button>
          </div>
        )}
      </div>
    </Popover>
  )
}
