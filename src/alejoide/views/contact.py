import reflex as rx
from alejoide.styles import styles
from alejoide.styles.sizes import Size
from alejoide.modules.constants import Links, Email
from alejoide.modules.utils import send_mail
from alejoide.components import forms
from alejoide.components.buttons import button


class FormState(rx.State):
    name: str
    email: str
    message: str
    # Form props
    submit_label: str = "Enviar"
    # Form state
    sent: bool = False
    loading: bool = False

    @rx.background
    async def send(self, form_data: dict) -> bool:
        async with self:
            self.loading = True
        success = send_mail(form_data)
        if success:
            async with self:
                self.sent = True
                self.loading = False
                self.submit_label = "¡Gracias por contactarte!"

    @rx.var
    def is_email_invalid(self) -> bool:
        return self.email and not ("@" in self.email and "." in self.email)

    @rx.var
    def is_name_invalid(self) -> bool:
        return self.name and len(self.name) < 3


def form() -> rx.chakra.Form:
    return rx.chakra.form(
        rx.chakra.hstack(
            rx.chakra.form_control(
                forms.input(
                    key="name",
                    label="Nombre",
                    placeholder="John Doe",
                    on_blur=FormState.set_name,
                    is_disabled=(FormState.sent | FormState.loading),
                ),
                rx.cond(
                    FormState.is_name_invalid,
                    rx.chakra.form_error_message("Ingresa un nombre válido."),
                ),
                is_invalid=FormState.is_name_invalid,
                is_required=True,
            ),
            rx.chakra.form_control(
                forms.input(
                    key="email",
                    label="Correo electrónico",
                    placeholder="johndoe@mail.com",
                    on_blur=FormState.set_email,
                    is_disabled=(FormState.sent | FormState.loading),
                ),
                rx.cond(
                    FormState.is_email_invalid,
                    rx.chakra.form_error_message("Ingresa un email válido."),
                ),
                is_invalid=FormState.is_email_invalid,
                is_required=True,
            ),
            align_items="flex-start",
        ),
        rx.chakra.form_control(
            forms.text_area(
                key="message",
                label="Mensaje",
                placeholder="Me gustaría contactarte para...",
                is_disabled=(FormState.sent | FormState.loading),
                on_blur=FormState.set_message,
            ),
            is_required=True,
        ),
        button(
            FormState.submit_label,
            type_="submit",
            is_loading=FormState.loading,
            is_disabled=FormState.sent,
            margin_top=Size.NORMAL.value,
            width="100%",
        ),
        on_submit=FormState.send,
    )


def contact() -> rx.Component:
    return rx.chakra.vstack(
        rx.chakra.flex(
            rx.chakra.box(
                rx.chakra.heading("Contacto"),
                rx.chakra.text(
                    "Si querés contactarme, podés hacerlo a través de este formulario."
                ),
            ),
        ),
        rx.chakra.flex(
            rx.chakra.box(
                form(),
                style=styles.FORM_COMPONENTS,
            )
        ),
        rx.chakra.flex(
            rx.chakra.text(
                "O si preferís, podes escribirme a mi correo electrónico: ",
                rx.chakra.link(
                    Email.PUBLIC_ADDRESS.value,
                    href=Links.EMAIL.value,
                ),
            )
        ),
        id="contact",
    )
