import {
	UploadApiOptions,
	UploadApiResponse,
	v2 as cloudinary,
} from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
	secure: true,
});

export async function uploadImageToCloudinary(
	imgSrc: string,
	folder: string,
	options?: UploadApiOptions,
): Promise<UploadApiResponse | null> {
	try {
		const uploadRes = await cloudinary.uploader.upload(imgSrc, {
			folder: `pollme/upload/${folder}`,
			overwrite: true,
			unique_filename: true,
			...options,
		});
		return uploadRes;
	} catch (error) {
		return null;
	}
}

export async function deleteFolderFromCloudinary(folder: string) {
	if (folder) {
		await cloudinary.api.delete_resources_by_prefix(`pollme/upload/${folder}`);
		cloudinary.api.delete_folder(`pollme/upload/${folder}`);
	}
}

export default cloudinary;
