import reflex as rx
from datetime import date
from alejoide.styles import styles
from alejoide.styles.sizes import Size
from alejoide.modules.constants import Links, App, Footer
from alejoide.components.logo import logo
from alejoide.components.react.icons import iconify


def icons():
    return rx.chakra.hstack(
        *[
            rx.chakra.link(
                iconify(item.get("icon")),
                href=item.get("link"),
                style=styles.DARK_LINKS,
                font_size=Size.LARGE.value,
                is_external=item.get("new_tab", True)
            ) for item in Footer.ICONS.value
        ],
        spacing=Size.SMALL.value,
    )


def footer() -> rx.Component:
    return rx.chakra.vstack(
        logo(clickable=False),
        rx.chakra.text(
            f"© 2023 - {date.today().year}" if date.today().year > 2023 else f"© 2023",
            rx.chakra.link(
                f" {App.NAME.value} by {App.AUTHOR.value} ",
                href=Links.APP_URL.value,
                color=styles.colors.Main.ACCENT.value,
                style=styles.DARK_LINKS,
            ),
            App.VERSION.value,
        ),
        icons(),
        style=styles.FOOTER,
    )
