from django.views.generic import TemplateView


class HtmlTemplateByNameView(TemplateView):
    def get_template_names(self):
        name = self.kwargs.get('name')
        return [f"{name}.html"]


