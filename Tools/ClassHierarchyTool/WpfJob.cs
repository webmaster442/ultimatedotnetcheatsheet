using Microsoft.Win32;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;

namespace ClassHierarchyTool;

internal sealed class WpfJob : IJob
{
    private readonly HashSet<Type> dialogs =
    [
        typeof(SaveFileDialog),
        typeof(OpenFileDialog),
        typeof(OpenFolderDialog),
        typeof(CommonItemDialog),
        typeof(CommonDialog),
        typeof(PrintDialog),
    ];
    private readonly HashSet<Type> freezables =
    [
        //freezables
        typeof(Freezable),
        typeof(Animatable),
        typeof(InputBinding),
        typeof(KeyBinding),
        typeof(MouseBinding),
        typeof(TaskbarItemInfo),
        typeof(WindowChrome),
        typeof(Camera),
        typeof(ProjectionCamera),
        typeof(OrthographicCamera),
        typeof(PerspectiveCamera),
        typeof(Geometry3D),
        typeof(MeshGeometry3D),
        typeof(Model3D),
        typeof(GeometryModel3D),
        typeof(Model3DGroup),
        typeof(GeneralTransform3D),
        typeof(Transform3D),
        typeof(MatrixTransform3D),
        typeof(AffineTransform3D),
        typeof(RotateTransform3D),
        typeof(ScaleTransform3D),
        typeof(Transform3DGroup),
        typeof(TranslateTransform3D),
        typeof(Material),
        typeof(MaterialGroup),
        typeof(DiffuseMaterial),
        typeof(EmissiveMaterial),
        typeof(SpecularMaterial),
        typeof(AmbientLight),
        typeof(DirectionalLight),
        typeof(PointLight),
        typeof(SpotLight),
        typeof(Brush),
        typeof(TileBrush),
        typeof(ImageBrush),
        typeof(VisualBrush),
        typeof(GradientBrush),
        typeof(LinearGradientBrush),
        typeof(RadialGradientBrush),
        typeof(SolidColorBrush),
        typeof(BitmapCacheBrush),
        typeof(Drawing),
        typeof(DrawingGroup),
        typeof(GeometryDrawing),
        typeof(ImageDrawing),
        typeof(VideoDrawing),
        typeof(GlyphRunDrawing),
        typeof(Pen),
        typeof(ImageSource),
        typeof(BitmapSource),
        typeof(DrawingImage),
        typeof(BitmapImage),
        typeof(InteropBitmap),
        typeof(BitmapFrame),
        typeof(CachedBitmap),
        typeof(RenderTargetBitmap),
        typeof(ColorConvertedBitmap),
        typeof(CroppedBitmap),
        typeof(FormatConvertedBitmap),
        typeof(WriteableBitmap),
        typeof(TransformedBitmap),
        typeof(GeneralTransform),
        typeof(Transform),
        typeof(MatrixTransform),
        typeof(RotateTransform),
        typeof(ScaleTransform),
        typeof(SkewTransform),
        typeof(TransformGroup),
        typeof(TranslateTransform),
    ];

    private readonly HashSet<Type> templates =
    [
        typeof(FrameworkTemplate),
        typeof(ControlTemplate),
        typeof(DataTemplate),
        typeof(HierarchicalDataTemplate),
        typeof(ItemsPanelTemplate),
        typeof(ItemsPanelTemplate),
        typeof(TriggerBase),
        typeof(DataTrigger),
        typeof(MultiDataTrigger),
        typeof(MultiTrigger),
        typeof(Trigger),
        typeof(Style),
        typeof(VisualState),
    ];

    private readonly HashSet<Type> frameworkElements =
    [
        typeof(FrameworkElement),
        typeof(AccessText),
        typeof(Popup),
        typeof(TextBlock),
        typeof(Decorator),
        typeof(Border),
        typeof(BulletDecorator),
        typeof(AdornerDecorator),
        typeof(Viewbox),
        typeof(Adorner),
        typeof(AdornedElementPlaceholder),
        typeof(Canvas),
        typeof(DockPanel),
        typeof(Grid),
        typeof(TabPanel),
        typeof(ToolBarOverflowPanel),
        typeof(ToolBarPanel),
        typeof(UniformGrid),
        typeof(WrapPanel),
        typeof(VirtualizingPanel),
        typeof(VirtualizingStackPanel),
        typeof(DataGridCellsPanel),
        typeof(Viewport3D),
        typeof(Shape),
        typeof(Ellipse),
        typeof(Line),
        typeof(System.Windows.Shapes.Path),
        typeof(Polygon),
        typeof(Polyline),
        typeof(System.Windows.Shapes.Rectangle),
        typeof(MediaElement),
        typeof(Image),
        typeof(HwndHost),
        typeof(System.Windows.Forms.Integration.WindowsFormsHost),
        typeof(WebBrowser),
        typeof(HostVisual),
    ];

    private readonly HashSet<Type> markupExtensions =
    [
        typeof(MarkupExtension),
        typeof(ArrayExtension),
        typeof(Binding),
        typeof(MultiBinding),
        typeof(PriorityBinding),
        typeof(BindingBase),
        typeof(BindingExpression),
        typeof(MultiBindingExpression),
        typeof(TemplateBindingExtension),
        typeof(TemplateBindingExpression),
        typeof(PriorityBindingExpression),
        typeof(BindingExpressionBase),
        typeof(TypeExtension),
        typeof(StaticExtension),
        typeof(StaticResourceExtension),
        typeof(DynamicResourceExtension),
        typeof(NullExtension),
        typeof(ThemeDictionaryExtension),
    ];

    private readonly HashSet<Type> controls =
    [
        typeof(Control),
        typeof(ContentControl),
        typeof(HeaderedContentControl),
        typeof(ItemsControl),
        typeof(HeaderedItemsControl),
        typeof(Selector),
        typeof(ComboBox),
        typeof(ComboBoxItem),
        typeof(ListBox),
        typeof(ListBoxItem),
        typeof(ProgressBar),
        typeof(ScrollViewer),
        typeof(ToolTip),
        typeof(TextBox),
        typeof(PasswordBox),
        typeof(RichTextBox),
        typeof(FlowDocumentScrollViewer),
        typeof(Button),
        typeof(RadioButton),
        typeof(ToggleButton),
        typeof(CheckBox),
        typeof(RepeatButton),
        typeof(ScrollBar),
        typeof(Slider),
        typeof(Thumb),
        typeof(Track),
        typeof(Expander),
        typeof(GroupBox),
        typeof(Label),
        typeof(Window),
        typeof(NavigationWindow),
        typeof(TabControl),
        typeof(DataGrid),
        typeof(ListView),
        typeof(TreeView),
        typeof(ToolBar),
        typeof(StatusBar),
        typeof(ToolBarTray),
        typeof(Menu),
        typeof(MenuItem),
        typeof(ContextMenu),
        typeof(GridSplitter),
        typeof(ResizeGrip),
        typeof(Separator),
        typeof(DatePicker),
        typeof(Calendar),
        typeof(FlowDocumentReader),
        typeof(FlowDocumentPageViewer),
        typeof(DocumentViewer),
        typeof(StickyNoteControl),
    ];

    private readonly HashSet<Type> baseTypes =
    [
        typeof(Animatable),
        typeof(FrameworkElement),
    ];

    public void Execute()
    {
        const string location = @"c:\Program Files\dotnet\packs\Microsoft.WindowsDesktop.App.Ref\9.0.1\ref\net9.0";

        File.WriteAllText("base.txt", baseTypes.GetNomnomlHierachy());
        File.WriteAllText("base.md", baseTypes.GetSummaries(location).ToMarkdown());

        File.WriteAllText("dialogs.nomnoml", dialogs.GetNomnomlHierachy());
        File.WriteAllText("dialogs.md", dialogs.GetSummaries(location).ToMarkdown());

        File.WriteAllText("freezables.nomnoml", freezables.GetNomnomlHierachy());
        File.WriteAllText("freezables.md", freezables.GetSummaries(location).ToMarkdown());

        File.WriteAllText("templates.nomnoml", templates.GetNomnomlHierachy());
        File.WriteAllText("templates.md", templates.GetSummaries(location).ToMarkdown());

        File.WriteAllText("frameworkElements.nomnoml", frameworkElements.GetNomnomlHierachy());
        File.WriteAllText("frameworkElements.md", frameworkElements.GetSummaries(location).ToMarkdown());

        File.WriteAllText("markupExtensions.nomnoml", markupExtensions.GetNomnomlHierachy());
        File.WriteAllText("markupExtensions.md", markupExtensions.GetSummaries(location).ToMarkdown());

        File.WriteAllText("controls.nomnoml", controls.GetNomnomlHierachy());
        File.WriteAllText("controls.md", controls.GetSummaries(location).ToMarkdown());
    }
}