* **DispatcherObject**

    Represents an object that is associated with a .

* **DependencyObject**

    Represents an object that participates in the dependency property system.

* **Freezable**

    Defines an object that has a modifiable state and a read-only (frozen) state. Classes that derive from  provide detailed change notification, can be made immutable, and can clone themselves.

* **Animatable**

    Abstract class that provides animation support.

* **Camera**

    Specifies what portion of the 3D scene is rendered by the  or  element.

* **ProjectionCamera**

    An abstract base class for perspective and orthographic projection cameras.

* **OrthographicCamera**

    Represents an orthographic projection camera.

* **PerspectiveCamera**

    Represents a perspective projection camera.

* **Geometry3D**

    Classes that derive from this abstract base class define 3D geometric shapes. The  class of objects can be used for hit-testing and rendering 3D graphic data.

* **MeshGeometry3D**

    Triangle primitive for building a 3-D shape.

* **Model3D**

    Provides functionality for 3-D models.

* **GeometryModel3D**

    Renders a  with the specified .

* **Model3DGroup**

    Enables using a number of 3-D models as a unit.

* **GeneralTransform3D**

    Provides generalized transformation support for 3-D objects.

* **Transform3D**

    Provides a parent class for all three-dimensional transformations, including translation, rotation, and scale transformations.

* **MatrixTransform3D**

    Creates a transformation specified by a , used to manipulate objects or coordinate systems in 3-D world space.

* **AffineTransform3D**

    Base class from which all concrete affine 3-D transforms - translations, rotations, and scale transformations - derive.

* **RotateTransform3D**

    Specifies a rotation transformation.

* **ScaleTransform3D**

    Scales an object in the three-dimensional x-y-z plane, starting from a defined center point. Scale factors are defined in x-, y-, and z- directions from this center point.

* **Transform3DGroup**

    Represents a transformation that is a composite of the  children in its .

* **TranslateTransform3D**

    Translates an object in the three-dimensional x-y-z plane.

* **Material**

    Abstract base class for materials.

* **MaterialGroup**

    Represents a  that is a composite of the Materials in its collection.

* **DiffuseMaterial**

    Allows the application of a 2-D brush, like a  or , to a diffusely-lit 3-D model.

* **EmissiveMaterial**

    Applies a  to a 3D model so that it participates in lighting calculations as if the  were emitting light equal to the color of the .

* **SpecularMaterial**

    Allows a 2-D brush, like a  or , to be applied to a specularly-lit 3-D model.

* **Light**

     object that represents lighting applied to a 3-D scene.

* **AmbientLight**

    Light object that applies light to objects uniformly, regardless of their shape.

* **DirectionalLight**

    Light object that projects its effect along a direction specified by a .

* **PointLightBase**

    Abstract base class that represents a light object that has a position in space and projects its light in all directions.

* **PointLight**

    Represents a light source that has a specified position in space and projects its light in all directions.

* **SpotLight**

    Light object that projects its effect in a cone-shaped area along a specified direction.

* **Brush**

    Defines objects used to paint graphical objects. Classes that derive from  describe how the area is painted.

* **TileBrush**

    Describes a way to paint a region by using one or more tiles.

* **ImageBrush**

    Paints an area with an image.

* **VisualBrush**

    Paints an area with a .

* **GradientBrush**

    An abstract class that describes a gradient, composed of gradient stops. Classes that inherit from  describe different ways of interpreting gradient stops.

* **LinearGradientBrush**

    Paints an area with a linear gradient.

* **RadialGradientBrush**

    Paints an area with a radial gradient. A focal point defines the beginning of the gradient, and a circle defines the end point of the gradient.

* **SolidColorBrush**

    Paints an area with a solid color.

* **BitmapCacheBrush**

    Paints an area with cached content.

* **Drawing**

    Abstract class that describes a 2-D drawing. This class cannot be inherited by your code.

* **DrawingGroup**

    Represents a collection of drawings that can be operated upon as a single drawing.

* **GeometryDrawing**

    Draws a  using the specified  and .

* **ImageDrawing**

    Draws an image within a region defined by a .

* **VideoDrawing**

    Plays a media file. If the media is a video file, the  draws it to the specified rectangle.

* **GlyphRunDrawing**

    Represents a  object that renders a .

* **Pen**

    Describes how a shape is outlined.

* **ImageSource**

    Represents an object type that has a width, height, and  such as a   and a . This is an abstract class.

* **BitmapSource**

    Represents a single, constant set of pixels at a certain size and resolution.

* **DrawingImage**

    An  that uses a  for content.

* **BitmapImage**

    Provides a specialized  that is optimized for loading images using Extensible Application Markup Language (XAML).

* **InteropBitmap**

     enables developers to improve rendering performance of non-WPF UIs that are hosted by WPF in interoperability scenarios.

* **BitmapFrame**

    Represents image data returned by a decoder and accepted by encoders.

* **CachedBitmap**

    Provides caching functionality for a .

* **RenderTargetBitmap**

    Converts a  object into a bitmap.

* **ColorConvertedBitmap**

    Changes the color space of a .

* **CroppedBitmap**

    Crops a .

* **FormatConvertedBitmap**

    Provides pixel format conversion functionality for a .

* **WriteableBitmap**

    Provides a  that can be written to and updated.

* **TransformedBitmap**

    Scales and rotates a .

* **GeneralTransform**

    Provides generalized transformation support for objects, such as points and rectangles. This is an abstract class.

* **Transform**

    Defines functionality that enables transformations in a 2-D plane. Transformations include rotation (), scale (), skew (), and translation (). This class hierarchy differs from the  structure because it is a class and it supports animation and enumeration semantics.

* **MatrixTransform**

    Creates an arbitrary affine matrix transformation that is used to manipulate objects or coordinate systems in a 2-D plane.

* **RotateTransform**

    Rotates an object clockwise about a specified point in a 2-D x-y coordinate system.

* **ScaleTransform**

    Scales an object in the 2-D x-y coordinate system.

* **SkewTransform**

    Represents a 2-D skew.

* **TransformGroup**

    Represents a composite  composed of other  objects.

* **TranslateTransform**

    Translates (moves) an object in the 2-D x-y coordinate system.

