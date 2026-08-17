type OptimizedImageProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	classNameParent?: string;
	type?: "png" | "jpg";
};

/**
 * Optimized image component with AVIF/WebP fallbacks.
 *
 * Expects images to exist in this format:
 * - image.avif (preferred)
 * - image.png (fallback)
 *
 * The `src` prop should be the path **without an extension**.
 *
 * Example:
 * <OptimizedImage
 *   src="/images/hero"
 *   alt="Dashboard preview"
 *   width={1200}
 *   height={800}
 * />
 */
export default function OptimizedImage({
	src,
	alt,
	width,
	height,
	className,
	classNameParent,
	type,
}: OptimizedImageProps) {
	if (!src) {
		throw new Error("[OptimizedImage] src is required");
	}

	return (
		<picture className={classNameParent}>
			<source srcSet={`${src}.avif`} type="image/avif" />

			<img
				src={`${src}.${type === "jpg" ? "jpg" : "png"}`}
				alt={alt}
				width={width}
				height={height}
				className={className}
				loading="lazy"
			/>
		</picture>
	);
}
