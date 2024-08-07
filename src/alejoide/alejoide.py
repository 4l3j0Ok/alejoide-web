import reflex as rx
from alejoide.views.navbar import navbar
from alejoide.views.header import header
from alejoide.views.about_me import about_me
from alejoide.views.footer import footer
from alejoide.views.contact import contact
from alejoide.views.projects import projects
from alejoide.styles import styles
from alejoide.styles.sizes import Size
from alejoide.modules.constants import App, GoogleAnalytics


@rx.page(route="/", title=App.NAME.value, description=App.DESCRIPTION.value)
def index() -> rx.Component:
    return rx.chakra.box(
        navbar(),
        header(),
        rx.chakra.spacer(height=Size.XXXLARGE.value),
        about_me(),
        rx.chakra.spacer(height=Size.XXXLARGE.value),
        projects(),
        rx.chakra.spacer(height=Size.XXXLARGE.value),
        contact(),
        rx.chakra.spacer(height=Size.XXXLARGE.value),
        footer(),
    )

app = rx.App(
    style=styles.BASE,
    stylesheets=styles.STYLESHEETS,
    html_custom_attrs={"className": "!scroll-smooth"},
    head_components=[
        rx.script(src=GoogleAnalytics.INIT_SCRIPT_URL.value),
        rx.script(GoogleAnalytics.SEND_DATA_SCRIPT.value),
    ]
)
